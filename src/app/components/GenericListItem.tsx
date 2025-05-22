import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState, memo } from "react";
import { useProgress } from "../context/ProgressContext";

export type ListItem = {
    name: string;
    link: string;
};

type GenericListItemProps = {
    item: ListItem;
    regionName: string;
    locationName: string;
};

const GenericListItem = memo(
    ({ item, regionName, locationName }: GenericListItemProps) => {
        const { handleCheckboxChange, checkedBoxes } = useProgress();
        const [isChecked, setIsChecked] = useState(false);

        useEffect(() => {
            // Get initial state from checkedBoxes
            const initialChecked = checkedBoxes[item.name]?.isChecked || false;
            setIsChecked(initialChecked);

            // Only initialize if not already in checkedBoxes
            if (!checkedBoxes[item.name]) {
                handleCheckboxChange({
                    name: item.name,
                    values: {
                        isChecked: false,
                        region: regionName,
                        location: locationName,
                    },
                });
            }
        }, [
            item.name,
            regionName,
            locationName,
            checkedBoxes,
            handleCheckboxChange,
        ]);

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
                            data-test={`item-checkbox`}
                        />
                    }
                    onChange={(e, checked) => {
                        setIsChecked(checked);
                        handleCheckboxChange({
                            name: item.name,
                            values: {
                                isChecked: checked,
                                region: regionName,
                                location: locationName,
                            },
                        });
                    }}
                    checked={isChecked}
                    data-test={`item-checkbox-label`}
                />
                {item.link && (
                    <Button
                        href={item.link}
                        target="_blank"
                        data-test={`item-view-button`}
                    >
                        View
                    </Button>
                )}
            </div>
        );
    }
);

GenericListItem.displayName = "GenericListItem";

export default GenericListItem;
