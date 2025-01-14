"use client";

import { useLayoutEffect, useState } from "react";
// import Image from "next/image";
import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import styles from "./page.module.css";
import progression from "../../progression.json";

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

type checkboxValues = {
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
        // typeof window !== "undefined"
        //     ? localStorage.getItem(checkedBoxesKey)
        //     : "{}";
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
                            {buildQuests(
                                location.quests,
                                regionName,
                                location.name
                            )}
                        </div>
                    )}

                    {!!location.items.length && (
                        <div className="flex flex-col">
                            <h4>Items</h4>
                            {buildItems(
                                location.items,
                                regionName,
                                location.name
                            )}
                        </div>
                    )}
                </AccordionDetails>
            </Accordion>
        );
    };

    const buildQuests = (
        quests: quest[],
        regionName: string,
        locationName: string
    ) => {
        return (
            <>
                {quests.map((quest: quest) => {
                    if (!checkedBoxes[quest.name]) {
                        checkedBoxes[quest.name] = {
                            isChecked: false,
                            region: regionName,
                            location: locationName,
                        };
                    }
                    return (
                        <FormControlLabel
                            label={quest.name}
                            control={<Checkbox />}
                            key={quest.name}
                            onChange={(e, checked) => {
                                handleChange({
                                    name: quest.name,
                                    values: {
                                        isChecked: checked,
                                        region: regionName,
                                        location: locationName,
                                    },
                                });
                            }}
                            checked={checkedBoxes[quest.name].isChecked}
                        />
                    );
                })}
            </>
        );
    };

    const buildItems = (
        items: item[],
        regionName: string,
        locationName: string
    ) => {
        return (
            <>
                {items.map((item: item) => {
                    if (!checkedBoxes[item.name]) {
                        checkedBoxes[item.name] = {
                            isChecked: false,
                            region: regionName,
                            location: locationName,
                        };
                    }
                    return (
                        <FormControlLabel
                            label={item.name}
                            control={<Checkbox />}
                            key={item.name}
                            onChange={(e, checked) => {
                                handleChange({
                                    name: item.name,
                                    values: {
                                        isChecked: checked,
                                        region: regionName,
                                        location: locationName,
                                    },
                                });
                            }}
                            checked={checkedBoxes[item.name].isChecked}
                        />
                    );
                })}
            </>
        );
    };

    const getPercentage = (slug: string, value: string) => {
        const values = Object.values(checkedBoxes);
        if (!values.length) return 0;

        const checks = values.filter(
            (check: checkboxValues) => check[slug] === value
        );
        const checked = checks.filter((check) => check.isChecked);
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
        console.log(checkedBoxes);
    };

    return <div>{buildRegion(progression.act1[0])}</div>;
}
