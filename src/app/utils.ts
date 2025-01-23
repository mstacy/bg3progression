import { checkboxValues } from "./page";

export const getPercentage = (
    checkedBoxes: Record<string, checkboxValues>,
    slug: keyof checkboxValues,
    value: string
) => {
    const values = Object.values(checkedBoxes);
    if (!values.length) return 0;

    const checks = value === "any" ? values : values.filter(
        (check: checkboxValues) => check[slug] === value
    );
    const checked = checks.filter((check) => check.isChecked);
    console.log(value, checked.length, checks.length);
    if (!checked.length) return 0;

    

    return ((checked.length / checks.length) * 100).toFixed(0);
};
