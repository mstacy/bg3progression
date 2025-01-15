"use client";

import { useLayoutEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { QuestList } from "./components/QuestList";
import progression from "../../progression.json";
import { ItemList } from "./components/ItemList";

type region = {
    name: string;
    link: string;
    locations: location[];
};

type location = {
    name: string;
    link: string;
    quests: quest[];
    items: item[];
};

type quest = {
    name: string;
    link: string;
};

type item = {
    name: string;
    link: string;
};

export type checkboxValues = {
    isChecked: boolean;
    region: string;
    location: string;
};

export default function Home() {
    const checkedBoxesKey = "checkedBoxes";
    const [checkedBoxes, setCheckedBoxes] = useState<
        Record<string, checkboxValues>
    >({});

    useLayoutEffect(() => {
        const saved = localStorage.getItem(checkedBoxesKey);

        const initial = JSON.parse(saved || "{}");
        if (Object.keys(initial).length) setCheckedBoxes(initial);
    }, []);

    useLayoutEffect(() => {
        localStorage.setItem(checkedBoxesKey, JSON.stringify(checkedBoxes));
    }, [checkedBoxes]);

    const buildRegion = (region: region) => {
        const percentComplete = getPercentage("region", region.name);
        return (
            <Accordion key={region.name} disableGutters>
                <AccordionSummary>
                    <div className="flex justify-between w-full">
                        <h2>{region.name}</h2>
                        {percentComplete}%
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    {region.locations.map((location) =>
                        buildLocation(location, region.name)
                    )}
                </AccordionDetails>
            </Accordion>
        );
    };

    const buildLocation = (location: location, regionName: string) => {
        const percentComplete = getPercentage("location", location.name);
        return (
            <Accordion key={location.name} disableGutters>
                <AccordionSummary>
                    <div className="flex justify-between w-full">
                        <h3>{location.name}</h3>
                        {percentComplete}%
                    </div>
                </AccordionSummary>

                <AccordionDetails
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    {!!location.quests.length && (
                        <div className="flex flex-col">
                            <h4>Quests</h4>
                            <QuestList
                                quests={location.quests}
                                regionName={regionName}
                                locationName={location.name}
                                checkedBoxes={checkedBoxes}
                                onCheckboxChange={(name, values) =>
                                    handleChange({ name, values })
                                }
                            />
                        </div>
                    )}

                    {!!location.items.length && (
                        <div className="flex flex-col">
                            <h4>Items</h4>
                            <ItemList
                                items={location.items}
                                regionName={regionName}
                                locationName={location.name}
                                checkedBoxes={checkedBoxes}
                                onCheckboxChange={(name, values) =>
                                    handleChange({ name, values })
                                }
                            />
                        </div>
                    )}
                </AccordionDetails>
            </Accordion>
        );
    };

    const getPercentage = (slug: keyof checkboxValues, value: string) => {
        const values = Object.values(checkedBoxes);
        if (!values.length) return 0;

        const checks = values.filter(
            (check: checkboxValues) => check[slug] === value
        );

        const checked = checks.filter((check) => check.isChecked);
        if (!checked.length) return 0;
        return ((checked.length / checks.length) * 100).toFixed(0);
    };

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

    return <div>{buildRegion(progression.act1[0])}</div>;
}
