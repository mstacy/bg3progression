import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { checkboxValues } from "../page";
import { ListItem } from "./GenericList";

type GenericListItemProps = {
    item: ListItem;
    regionName: string;
    locationName: string;
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (name: string, values: checkboxValues) => void;
};

const GenericListItem = ({
    item,
    regionName,
    locationName,
    checkedBoxes,
    onCheckboxChange,
}: GenericListItemProps) => {
    if (!checkedBoxes[item.name]) {
        checkedBoxes[item.name] = {
            isChecked: false,
            region: regionName,
            location: locationName,
        };
    }

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
                    onCheckboxChange(item.name, {
                        isChecked: checked,
                        region: regionName,
                        location: locationName,
                    });
                }}
                checked={checkedBoxes[item.name].isChecked}
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
