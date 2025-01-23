"use client";

import { useLayoutEffect, useState } from "react";
import progression from "../../progression.json";
import { Region } from "./components/Region";
import { Header } from "./components/Header";

export type checkboxValues = {
    isChecked: boolean;
    region: string;
    location: string;
};

export default function Home() {
    const checkedBoxesKey = "act1";
    const [checkedBoxes, setCheckedBoxes] = useState<
        Record<string, checkboxValues>
    >({});
    const [searchTerm, setSearchTerm] = useState("");
    const accordionOpenKey = "accordionsOpen";
    const [accordionsOpen, setAccordionsOpen] = useState<
        Record<string, boolean>
    >({});
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        const savedCheckedBoxes = localStorage.getItem(checkedBoxesKey);
        const savedAccordionsOpen = localStorage.getItem(accordionOpenKey);

        const initialCheckedBoxes = JSON.parse(savedCheckedBoxes || "{}");
        if (Object.keys(initialCheckedBoxes).length)
            setCheckedBoxes(initialCheckedBoxes);

        const initialAccordionsOpen = JSON.parse(savedAccordionsOpen || "{}");
        if (Object.keys(initialAccordionsOpen).length)
            setAccordionsOpen(initialAccordionsOpen);

        setIsLoading(false);
    }, []);

    useLayoutEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem(checkedBoxesKey, JSON.stringify(checkedBoxes));
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [checkedBoxes]);

    useLayoutEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem(
                accordionOpenKey,
                JSON.stringify(accordionsOpen)
            );
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [accordionsOpen]);

    const handleChange = ({
        name,
        values,
    }: {
        name: string;
        values: checkboxValues;
    }) => {
        checkedBoxes[name] = values;
        setCheckedBoxes({
            ...checkedBoxes,
        });
    };

    const handleAccordionToggle = (accordionId: string) => {
        setAccordionsOpen((current) => ({
            ...current,
            [accordionId]: !current[accordionId],
        }));
    };

    const filteredRegions = progression.act1
        .map((region) => {
            const searchLower = searchTerm.toLowerCase();

            // If region name matches, keep all locations
            if (region.name.toLowerCase().includes(searchLower)) {
                return region;
            }

            // Filter locations and their contents
            const filteredLocations = region.locations.filter((location) => {
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
                        interaction.name.toLowerCase().includes(searchLower)
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

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <Header checkedBoxes={checkedBoxes} onSearch={setSearchTerm} />
            <main className="max-w-4xl mx-auto p-4 pt-24">
                {filteredRegions.map((region) => (
                    <Region
                        key={region.name}
                        region={region}
                        checkedBoxes={checkedBoxes}
                        onCheckboxChange={handleChange}
                        accordionsOpen={accordionsOpen}
                        onAccordionToggle={handleAccordionToggle}
                        searchTerm={searchTerm}
                    />
                ))}
            </main>
        </div>
    );
}
