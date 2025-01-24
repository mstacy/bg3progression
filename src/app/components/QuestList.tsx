import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { checkboxValues } from "../page";

export type Quest = {
    name: string;
    link: string;
};

const QuestList = ({
    quests,
    regionName,
    locationName,
    checkedBoxes,
    onCheckboxChange,
}: {
    quests: Quest[];
    regionName: string;
    locationName: string;
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (name: string, values: checkboxValues) => void;
}) => {
    return (
        <>
            <h4>Quests</h4>
            <div className="flex flex-col">
                {quests.map((quest: Quest) => {
                    if (!checkedBoxes[quest.name]) {
                        checkedBoxes[quest.name] = {
                            isChecked: false,
                            region: regionName,
                            location: locationName,
                        };
                    }
                    return (
                        <div
                            key={`${quest.name}-${regionName}-${locationName}`}
                            className="flex justify-between"
                        >
                            <FormControlLabel
                                label={quest.name}
                                control={<Checkbox />}
                                onChange={(e, checked) => {
                                    onCheckboxChange(quest.name, {
                                        isChecked: checked,
                                        region: regionName,
                                        location: locationName,
                                    });
                                }}
                                checked={checkedBoxes[quest.name].isChecked}
                            />

                            <Button href={quest.link} target="_blank">
                                View
                            </Button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default QuestList;
