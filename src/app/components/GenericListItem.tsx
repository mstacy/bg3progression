import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
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

const GenericListItem = ({
    item,
    regionName,
    locationName,
}: GenericListItemProps) => {
    const { checkedBoxes, handleCheckboxChange } = useProgress();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // Only set the initial state once on mount
        const initialChecked = checkedBoxes[`${item.name}`]?.isChecked
            ? true
            : false;
        setIsChecked(initialChecked);

        if (!initialChecked) {
            handleCheckboxChange({
                name: item.name,
                values: {
                    isChecked: false,
                    region: regionName,
                    location: locationName,
                },
            });
        }
        // Only run once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
};

export default GenericListItem;
