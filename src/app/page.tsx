"use client";

import { useEffect, useLayoutEffect, useState, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import progression from "../../progression.json";
import { Region } from "./components/Region";
import { Header } from "./components/Header";
import { ProgressProvider } from "./context/ProgressContext";
import { theme } from "./theme";
import { subscribeUser, unsubscribeUser, sendNotification } from "./actions";

export type checkboxValues = {
    isChecked: boolean;
    region: string;
    location: string;
};

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [originalData] = useState(progression.act1);

    const filteredRegions = useMemo(() => {
        return originalData
            .map((region) => {
                const searchLower = searchTerm.toLowerCase();

                // Create a deep copy of locations to avoid mutating original data
                const filteredLocations = region.locations
                    .map((location) => ({
                        ...location,
                        quests: [...(location.quests || [])],
                        items: [...(location.items || [])],
                        interactions: [...(location.interactions || [])],
                    }))
                    .filter((location) => {
                        // If location name matches, keep all its contents
                        if (location.name.toLowerCase().includes(searchLower)) {
                            return true;
                        }

                        // Filter quests
                        const matchingQuests =
                            location.quests?.filter((quest) =>
                                quest.name.toLowerCase().includes(searchLower)
                            ) || [];

                        // Filter items
                        const matchingItems =
                            location.items?.filter((item) =>
                                item.name.toLowerCase().includes(searchLower)
                            ) || [];

                        // Filter interactions
                        const matchingInteractions =
                            location.interactions?.filter((interaction) =>
                                interaction.name
                                    .toLowerCase()
                                    .includes(searchLower)
                            ) || [];

                        // If any content matches, create filtered location
                        if (
                            matchingQuests.length ||
                            matchingItems.length ||
                            matchingInteractions.length
                        ) {
                            location.quests = matchingQuests;
                            location.items = matchingItems;
                            location.interactions = matchingInteractions;
                            return true;
                        }

                        return false;
                    });

                // Only include region if it has matching locations
                if (filteredLocations.length) {
                    return {
                        ...region,
                        locations: filteredLocations,
                    };
                }

                return null;
            })
            .filter(Boolean) as typeof progression.act1;
    }, [searchTerm, originalData]);

    useLayoutEffect(() => {
        setIsLoading(false);
    }, []);

    // if (isLoading) {
    //     return (
    //         <ThemeProvider theme={theme}>
    //             <CssBaseline />
    //             <div className="h-screen w-screen flex items-center justify-center">
    //                 <div className="text-lg">Loading...</div>
    //             </div>
    //         </ThemeProvider>
    //     );
    // }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isLoading ? (
                <div className="h-screen w-screen flex items-center justify-center">
                    <div className="text-lg">Loading...</div>
                </div>
            ) : (
                <>
                    <ProgressProvider>
                        <div data-test="app-container">
                            <Header onSearch={setSearchTerm} />
                            <main className="max-w-4xl mx-auto p-4 pt-24">
                                {filteredRegions.map((region) => (
                                    <Region
                                        key={region.name}
                                        region={region}
                                        searchTerm={searchTerm}
                                    />
                                ))}
                            </main>
                        </div>
                    </ProgressProvider>
                    {/* <PushNotificationManager />
                    <InstallPrompt /> */}
                </>
            )}
        </ThemeProvider>
    );
}

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(
        null
    );
    const [message, setMessage] = useState("");

    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            setIsSupported(true);
            registerServiceWorker();
        }
    }, []);

    async function registerServiceWorker() {
        console.log("Registering service worker");
        const registration = await navigator.serviceWorker.register(
            "/bg3progression/sw.js",
            {
                scope: "/bg3progression/",
                updateViaCache: "none",
            }
        );
        console.log("Registration:", registration);
        const sub = await registration.pushManager.getSubscription();
        console.log("Subscription:", sub);
        setSubscription(sub);
    }

    async function subscribeToPush() {
        const registration = await navigator.serviceWorker.ready;

        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
            ),
        });

        setSubscription(sub);
        const serializedSub = JSON.parse(JSON.stringify(sub));
        await subscribeUser(serializedSub);
    }

    async function unsubscribeFromPush() {
        await subscription?.unsubscribe();
        setSubscription(null);
        await unsubscribeUser();
    }

    async function sendTestNotification() {
        if (subscription) {
            await sendNotification(message);
            setMessage("");
        }
    }

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>;
    }

    return (
        <div>
            <h3>Push Notifications</h3>
            {subscription ? (
                <>
                    <p>You are subscribed to push notifications.</p>
                    <button onClick={unsubscribeFromPush}>Unsubscribe</button>
                    <input
                        type="text"
                        placeholder="Enter notification message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendTestNotification}>Send Test</button>
                </>
            ) : (
                <>
                    <p>You are not subscribed to push notifications.</p>
                    <button onClick={subscribeToPush}>Subscribe</button>
                </>
            )}
        </div>
    );
}

function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !(window as any).MSStream
        );

        setIsStandalone(
            window.matchMedia("(display-mode: standalone)").matches
        );
    }, []);

    if (isStandalone || !isIOS) {
        return null; // Don't show install button if already installed
    }

    return (
        <div>
            <h3>Install App</h3>
            <button>Add to Home Screen</button>
            {isIOS && (
                <p>
                    To install this app on your iOS device, tap the share button
                    <span role="img" aria-label="share icon">
                        {" "}
                        ⎋{" "}
                    </span>
                    and then "Add to Home Screen"
                    <span role="img" aria-label="plus icon">
                        {" "}
                        ➕{" "}
                    </span>
                    .
                </p>
            )}
        </div>
    );
}
