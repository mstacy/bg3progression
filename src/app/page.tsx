"use client";

import { useLayoutEffect, useState, useMemo } from "react";
import progression from "../../progression.json";
import { Region } from "./components/Region";
import { Header } from "./components/Header";
import { ProgressProvider } from "./context/ProgressContext";

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

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <ProgressProvider>
            <div>
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
    );
}
