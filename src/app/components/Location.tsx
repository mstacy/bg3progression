import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@mui/material";
import { checkboxValues } from "../page";
import { getPercentage } from "../utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ListItem } from "./GenericList";

export type LocationProps = {
    name: string;
    link: string;
    quests: ListItem[];
    interactions: ListItem[];
    items: ListItem[];
    companions?: string[];
};

// Lazy Loading Components
const GenericList = dynamic(() => import("./GenericList"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const Location = ({
    location,
    regionName,
    checkedBoxes,
    onCheckboxChange,
    initialAccordionsOpen,
    onAccordionToggle,
    searchTerm,
}: {
    location: LocationProps;
    regionName: string;
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (params: {
        name: string;
        values: checkboxValues;
    }) => void;
    initialAccordionsOpen: Record<string, boolean>;
    onAccordionToggle: (accordionId: string) => void;
    searchTerm: string;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [prevExpanded, setPrevExpanded] = useState<boolean | null>(null);
    const percentComplete = getPercentage(
        checkedBoxes,
        "location",
        location.name
    );
    const accordionId = `location-${regionName}-${location.name}`;

    useEffect(() => {
        if (initialAccordionsOpen[accordionId]) {
            setIsExpanded(initialAccordionsOpen[accordionId]);
        }
    }, [initialAccordionsOpen, accordionId]);

    useEffect(() => {
        if (searchTerm) {
            if (prevExpanded === null) setPrevExpanded(isExpanded);
            setIsExpanded(true);
        } else {
            if (prevExpanded !== null) setIsExpanded(prevExpanded);
            setPrevExpanded(null);
        }
    }, [isExpanded, prevExpanded, searchTerm]);

    return (
        <Accordion
            key={location.name}
            disableGutters
            expanded={isExpanded}
            onChange={() => {
                setIsExpanded(!isExpanded);
                onAccordionToggle(accordionId);
            }}
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

                    <div>
                        {location?.companions
                            ? location.companions.join(", ")
                            : ""}
                    </div>

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
                {!!location.quests.length && isExpanded && (
                    <GenericList
                        items={location.quests}
                        title="Quests"
                        regionName={regionName}
                        locationName={location.name}
                        checkedBoxes={checkedBoxes}
                        onCheckboxChange={(name, values) =>
                            onCheckboxChange({ name, values })
                        }
                    />
                )}

                {!!location.interactions.length && isExpanded && (
                    <GenericList
                        items={location.interactions}
                        title="Interactions"
                        regionName={regionName}
                        locationName={location.name}
                        checkedBoxes={checkedBoxes}
                        onCheckboxChange={(name, values) =>
                            onCheckboxChange({ name, values })
                        }
                    />
                )}

                {!!location.items.length && isExpanded && (
                    <GenericList
                        items={location.items}
                        title="Items"
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

export default Location;
