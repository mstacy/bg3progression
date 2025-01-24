import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { checkboxValues } from "../page";

export type ListItem = {
    name: string;
    link: string;
};

type GenericListProps = {
    items: ListItem[];
    title: string;
    regionName: string;
    locationName: string;
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (name: string, values: checkboxValues) => void;
};

const GenericList = ({
    items,
    title,
    regionName,
    locationName,
    checkedBoxes,
    onCheckboxChange,
}: GenericListProps) => {
    return (
        <>
            <h4>{title}</h4>
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
                })}
            </div>
        </>
    );
};

export default GenericList;
