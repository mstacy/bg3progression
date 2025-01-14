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

export default function Home() {
    const checkedBoxesKey = "checkedBoxes";
    const [checkedBoxes, setCheckedBoxes] = useState<Record<string, boolean>>(
        {}
    );

    useLayoutEffect(() => {
        const saved =
            typeof window !== "undefined"
                ? localStorage.getItem(checkedBoxesKey)
                : "{}";
        const initial = JSON.parse(saved || "{}");
        if (Object.keys(initial).length) setCheckedBoxes(initial);
    }, []);

    useLayoutEffect(() => {
        localStorage.setItem(checkedBoxesKey, JSON.stringify(checkedBoxes));
    }, [checkedBoxes]);

    const buildRegion = (region: region) => {
        return (
            <Accordion key={region.name} disableGutters>
                <AccordionSummary>
                    <div className="flex justify-between w-full">
                        <h2>{region.name}</h2>
                        <div>0%</div>
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    {region.locations.map((location) =>
                        buildLocation(location)
                    )}
                </AccordionDetails>
            </Accordion>
        );
    };

    const buildLocation = (location: location) => {
        return (
            <Accordion key={location.name} disableGutters>
                <AccordionSummary>
                    <h3>{location.name}</h3>
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
                            {buildQuests(location.quests)}
                        </div>
                    )}

                    {!!location.items.length && (
                        <div className="flex flex-col">
                            <h4>Items</h4>
                            {buildItems(location.items)}
                        </div>
                    )}
                </AccordionDetails>
            </Accordion>
        );
    };

    const buildQuests = (quests: quest[]) => {
        return (
            <>
                {quests.map((quest: quest) => {
                    if (!checkedBoxes[quest.name]) {
                        checkedBoxes[quest.name] = false;
                    }
                    return (
                        <FormControlLabel
                            label={quest.name}
                            control={<Checkbox />}
                            key={quest.name}
                            onChange={(e, checked) => {
                                handleChange({
                                    checked: checked,
                                    name: quest.name,
                                });
                            }}
                            checked={checkedBoxes[quest.name]}
                        />
                    );
                })}
            </>
        );
    };

    const buildItems = (items: item[]) => {
        return (
            <>
                {items.map((item: item) => {
                    if (!checkedBoxes[item.name]) {
                        checkedBoxes[item.name] = false;
                    }
                    return (
                        <FormControlLabel
                            label={item.name}
                            control={<Checkbox />}
                            key={item.name}
                            onChange={(e, checked) => {
                                handleChange({
                                    checked: checked,
                                    name: item.name,
                                });
                            }}
                            checked={checkedBoxes[item.name]}
                        />
                    );
                })}
            </>
        );
    };

    const handleChange = ({
        checked,
        name,
    }: {
        checked: boolean;
        name: string;
    }) => {
        // console.log(e);

        checkedBoxes[name] = checked;
        setCheckedBoxes({
            ...checkedBoxes,
        });
        console.log(checkedBoxes);
    };

    return <div>{buildRegion(progression.act1[0])}</div>;
}
