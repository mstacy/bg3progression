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
    initialChecked: boolean;
};

const GenericListItem = ({
    item,
    regionName,
    locationName,
    initialChecked = false,
}: Omit<GenericListItemProps, "onCheckboxChange">) => {
    const { handleCheckboxChange } = useProgress();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // Only set the initial state once on mount
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
