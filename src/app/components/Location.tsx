import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState, memo, useCallback } from "react";
import { ListItem } from "./GenericListItem";
import { useProgress } from "../context/ProgressContext";

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

const Location = memo(
    ({
        location,
        regionName,
        searchTerm,
    }: {
        location: LocationProps;
        regionName: string;
        searchTerm: string;
    }) => {
        const {
            initialAccordionsOpen,
            handleAccordionToggle,
            getPercentageComplete,
        } = useProgress();
        const [isExpanded, setIsExpanded] = useState(false);
        const [prevExpanded, setPrevExpanded] = useState<boolean | null>(null);
        const percentComplete = getPercentageComplete(
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

        const handleToggle = useCallback(() => {
            setIsExpanded(!isExpanded);
            handleAccordionToggle(accordionId);
        }, [isExpanded, handleAccordionToggle, accordionId]);

        return (
            <Accordion
                key={location.name}
                expanded={isExpanded}
                onChange={handleToggle}
                data-test={`location-accordion`}
            >
                <AccordionSummary>
                    <div className="flex justify-between w-full items-center">
                        <h3 data-test={`location-name`}>{location.name}</h3>

                        <div>
                            {location?.companions
                                ? location.companions.join(", ")
                                : ""}
                        </div>

                        <div className="flex justify-between items-center">
                            <Button
                                href={location.link}
                                target="_blank"
                                data-test={`location-view-button`}
                            >
                                View
                            </Button>
                            <div
                                className="w-10 text-right"
                                data-test={`location-completion`}
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
                        padding: "0 0 0 40px",
                    }}
                    data-test={`location-details`}
                >
                    {!!location.quests.length && isExpanded && (
                        <GenericList
                            items={location.quests}
                            title="Quests"
                            regionName={regionName}
                            locationName={location.name}
                        />
                    )}

                    {!!location.interactions.length && isExpanded && (
                        <GenericList
                            items={location.interactions}
                            title="Interactions"
                            regionName={regionName}
                            locationName={location.name}
                        />
                    )}

                    {!!location.items.length && isExpanded && (
                        <GenericList
                            items={location.items}
                            title="Items"
                            regionName={regionName}
                            locationName={location.name}
                        />
                    )}
                </AccordionDetails>
            </Accordion>
        );
    }
);

Location.displayName = "Location";

export default Location;
