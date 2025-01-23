import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@mui/material";
import { QuestList } from "./QuestList";
import { InteractionList } from "./InteractionList";
import { ItemList } from "./ItemList";
import { checkboxValues } from "../page";
import { Quest } from "./QuestList";
import { Interaction } from "./InteractionList";
import { Item } from "./ItemList";
import { getPercentage } from "../utils";

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
    accordionsOpen,
    onAccordionToggle,
    searchTerm,
}: {
    location: Location;
    regionName: string;
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (params: {
        name: string;
        values: checkboxValues;
    }) => void;
    accordionsOpen: Record<string, boolean>;
    onAccordionToggle: (accordionId: string) => void;
    searchTerm: string;
}) => {
    const percentComplete = getPercentage(
        checkedBoxes,
        "location",
        location.name
    );

    const accordionId = `location-${regionName}-${location.name}`;
    if (!accordionsOpen[accordionId]) {
        accordionsOpen[accordionId] = false;
    }

    return (
        <Accordion
            key={location.name}
            disableGutters
            expanded={accordionsOpen[accordionId] || !!searchTerm.length}
            onChange={() => onAccordionToggle(accordionId)}
            slots={{
                heading: "div",
            }}
            data-test={`location-accordion-${location.name}`}
        >
            <AccordionSummary>
                <div className="flex justify-between w-full items-center">
                    <h3 data-test={`location-name-${location.name}`}>
                        {location.name}
                    </h3>

                    <div className="flex justify-between items-center">
                        <Button
                            href={location.link}
                            target="_blank"
                            data-test={`location-view-button-${location.name}`}
                        >
                            View
                        </Button>
                        <div
                            className="w-10 text-right"
                            data-test={`location-completion-${location.name}`}
                        >
                            {percentComplete}%
                        </div>
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
                data-test={`location-details-${location.name}`}
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
