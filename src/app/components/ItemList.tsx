import { Checkbox, FormControlLabel } from "@mui/material";
import { checkboxValues } from "../page";

export type Item = {
    name: string;
    link: string;
};

export const ItemList = ({
    items,
    regionName,
    locationName,
    checkedBoxes,
    onCheckboxChange,
}: {
    items: Item[];
    regionName: string;
    locationName: string;
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (name: string, values: checkboxValues) => void;
}) => {
    return (
        <>
            <h4>Items</h4>
            <div className="flex flex-col">
                {items.map((item) => {
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
                                onCheckboxChange(item.name, {
                                    isChecked: checked,
                                    region: regionName,
                                    location: locationName,
                                });
                            }}
                            checked={checkedBoxes[item.name].isChecked}
                        />
                    );
                })}
            </div>
        </>
    );
};
