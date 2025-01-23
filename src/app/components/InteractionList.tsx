import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { checkboxValues } from "../page";

export type Interaction = {
    name: string;
    link: string;
};

const InteractionList = ({
    interactions,
    regionName,
    locationName,
    checkedBoxes,
    onCheckboxChange,
}: {
    interactions: Interaction[];
    regionName: string;
    locationName: string;
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (name: string, values: checkboxValues) => void;
}) => {
    return (
        <>
            <h4>Interactions</h4>
            <div className="flex flex-col">
                {interactions.map((interaction: Interaction) => {
                    if (!checkedBoxes[interaction.name]) {
                        checkedBoxes[interaction.name] = {
                            isChecked: false,
                            region: regionName,
                            location: locationName,
                        };
                    }
                    return (
                        <div
                            key={interaction.name}
                            className="flex justify-between"
                        >
                            <FormControlLabel
                                label={interaction.name}
                                control={<Checkbox />}
                                onChange={(e, checked) => {
                                    onCheckboxChange(interaction.name, {
                                        isChecked: checked,
                                        region: regionName,
                                        location: locationName,
                                    });
                                }}
                                checked={
                                    checkedBoxes[interaction.name].isChecked
                                }
                            />

                            <Button href={interaction.link} target="_blank">
                                View
                            </Button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default InteractionList;
