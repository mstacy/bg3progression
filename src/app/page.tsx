"use client";

import { useLayoutEffect, useState } from "react";
import progression from "../../progression.json";
import { Region } from "./components/Region";

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

    return (
        <div>
            <Region
                region={progression.act1[0]}
                checkedBoxes={checkedBoxes}
                onCheckboxChange={handleChange}
                getPercentage={getPercentage}
            />
        </div>
    );
}
