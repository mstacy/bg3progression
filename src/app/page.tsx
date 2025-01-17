"use client";

import { useLayoutEffect, useState } from "react";
import progression from "../../progression.json";
import { Region } from "./components/Region";
import { getPercentage } from "./utils";

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

    useLayoutEffect(() => {
        const saved = localStorage.getItem(checkedBoxesKey);

        const initial = JSON.parse(saved || "{}");
        if (Object.keys(initial).length) setCheckedBoxes(initial);
    }, []);

    useLayoutEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem(checkedBoxesKey, JSON.stringify(checkedBoxes));
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [checkedBoxes]);

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

    return (
        <div>
            {progression.act1.map((region) => (
                <Region
                    key={region.name}
                    region={region}
                    checkedBoxes={checkedBoxes}
                    onCheckboxChange={handleChange}
                    getPercentage={(slug, value) =>
                        getPercentage(checkedBoxes, slug, value)
                    }
                />
            ))}
        </div>
    );
}
