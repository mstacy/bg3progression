import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { checkboxValues } from "../page";
import { ListItem } from "./GenericList";
import { useEffect, useState } from "react";

type GenericListItemProps = {
    item: ListItem;
    regionName: string;
    locationName: string;
    initialChecked: boolean;
    onCheckboxChange: (name: string, values: checkboxValues) => void;
};

const GenericListItem = ({
    item,
    regionName,
    locationName,
    initialChecked,
    onCheckboxChange,
}: GenericListItemProps) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (initialChecked) {
            setIsChecked(initialChecked);
        }
    }, [initialChecked]);

    return (
        <div
            key={`${item.name}-${regionName}-${locationName}`}
            className="flex justify-between"
        >
            <FormControlLabel
                label={item.name}
                control={
                    <Checkbox
                        id={`${item.name}-${regionName}-${locationName}`}
                    />
                }
                onChange={(e, checked) => {
                    setIsChecked(checked);
                    onCheckboxChange(item.name, {
                        isChecked: checked,
                        region: regionName,
                        location: locationName,
                    });
                }}
                checked={isChecked}
            />
            {item.link && (
                <Button href={item.link} target="_blank">
                    View
                </Button>
            )}
        </div>
    );
};

export default GenericListItem;
