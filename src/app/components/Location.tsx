import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { QuestList } from "./QuestList";
import { InteractionList } from "./InteractionList";
import { ItemList } from "./ItemList";
import { checkboxValues } from "../page";
import { Quest } from "./QuestList";
import { Interaction } from "./InteractionList";
import { Item } from "./ItemList";

export type Location = {
    name: string;
    link: string;
    quests: Quest[];
    interactions: Interaction[];
    items: Item[];
};

export const Location = ({
    location,
    regionName,
    checkedBoxes,
    onCheckboxChange,
    getPercentage,
    index,
}: {
    location: Location;
    regionName: string;
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (params: {
        name: string;
        values: checkboxValues;
    }) => void;
    getPercentage: (
        slug: keyof checkboxValues,
        value: string
    ) => number | string;
    index: number;
}) => {
    const percentComplete = getPercentage("location", location.name);

    return (
        <Accordion
            key={location.name}
            disableGutters
            // defaultExpanded={index === 0}
            slots={{
                heading: "div",
            }}
        >
            <AccordionSummary>
                <div className="flex justify-between w-full">
                    <h3>{location.name}</h3>
                    {percentComplete}%
                </div>
            </AccordionSummary>

            <AccordionDetails
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                {!!location.quests.length && (
                    <QuestList
                        quests={location.quests}
                        regionName={regionName}
                        locationName={location.name}
                        checkedBoxes={checkedBoxes}
                        onCheckboxChange={(name, values) =>
                            onCheckboxChange({ name, values })
                        }
                    />
                )}

                {!!location.interactions.length && (
                    <InteractionList
                        interactions={location.interactions}
                        regionName={regionName}
                        locationName={location.name}
                        checkedBoxes={checkedBoxes}
                        onCheckboxChange={(name, values) =>
                            onCheckboxChange({ name, values })
                        }
                    />
                )}

                {!!location.items.length && (
                    <ItemList
                        items={location.items}
                        regionName={regionName}
                        locationName={location.name}
                        checkedBoxes={checkedBoxes}
                        onCheckboxChange={(name, values) =>
                            onCheckboxChange({ name, values })
                        }
                    />
                )}
            </AccordionDetails>
        </Accordion>
    );
};
