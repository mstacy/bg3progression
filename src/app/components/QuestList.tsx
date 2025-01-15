import { Checkbox, FormControlLabel } from "@mui/material";
import { checkboxValues } from "../page";

type quest = {
    name: string;
    link: string;
};

export const QuestList = ({
    quests,
    regionName,
    locationName,
    checkedBoxes,
    onCheckboxChange,
}: {
    quests: quest[];
    regionName: string;
    locationName: string;
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (name: string, values: checkboxValues) => void;
}) => {
    return (
        <>
            {quests.map((quest: quest) => {
                if (!checkedBoxes[quest.name]) {
                    checkedBoxes[quest.name] = {
                        isChecked: false,
                        region: regionName,
                        location: locationName,
                    };
                }
                return (
                    <FormControlLabel
                        label={quest.name}
                        control={<Checkbox />}
                        key={quest.name}
                        onChange={(e, checked) => {
                            onCheckboxChange(quest.name, {
                                isChecked: checked,
                                region: regionName,
                                location: locationName,
                            });
                        }}
                        checked={checkedBoxes[quest.name].isChecked}
                    />
                );
            })}
        </>
    );
};

// In the buildLocation function, replace the buildQuests call with:
// {!!location.quests.length && (
//     <div className="flex flex-col">
//         <h4>Quests</h4>
//         <QuestList
//             quests={location.quests}
//             regionName={regionName}
//             locationName={location.name}
//             checkedBoxes={checkedBoxes}
//             onCheckboxChange={(name, values) =>
//                 handleChange({ name, values })
//             }
//         />
//     </div>
// )}

// Remove the original buildQuests function
