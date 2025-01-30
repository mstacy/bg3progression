import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@mui/material";
import { checkboxValues } from "../page";
import { getPercentage } from "../utils";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LocationProps } from "./Location";

// Lazy Loading Components
const Location = dynamic(() => import("./Location"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export const Region = ({
    region,
    checkedBoxes,
    onCheckboxChange,
    initialAccordionsOpen,
    onAccordionToggle,
    searchTerm,
}: {
    region: {
        name: string;
        link: string;
        locations: LocationProps[];
    };
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
    const percentComplete = getPercentage(checkedBoxes, "region", region.name);
    const accordionId = `region-${region.name}`;

    useEffect(() => {
        if (initialAccordionsOpen[accordionId]) {
            setIsExpanded(initialAccordionsOpen[accordionId]);
        }
    }, [initialAccordionsOpen, accordionId]);

    return (
        <Accordion
            key={region.name}
            disableGutters
            expanded={isExpanded || !!searchTerm}
            slots={{
                heading: "div",
            }}
            data-test={`region-accordion-${region.name}`}
            onChange={() => {
                setIsExpanded(!isExpanded);
                onAccordionToggle(`region-${region.name}`);
            }}
        >
            <AccordionSummary>
                <div className="flex justify-between w-full items-center">
                    <h2 data-test={`region-name-${region.name}`}>
                        {region.name}
                    </h2>
                    <div className="flex justify-between items-center">
                        <Button
                            href={region.link}
                            target="_blank"
                            data-test={`region-view-button-${region.name}`}
                        >
                            View
                        </Button>
                        <div
                            className="w-10 text-right"
                            data-test={`region-completion-${region.name}`}
                        >
                            {percentComplete}%
                        </div>
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails data-test={`region-details-${region.name}`}>
                {region.locations.map((location) => (
                    <Location
                        key={location.name}
                        location={location}
                        regionName={region.name}
                        checkedBoxes={checkedBoxes}
                        onCheckboxChange={onCheckboxChange}
                        initialAccordionsOpen={initialAccordionsOpen}
                        onAccordionToggle={onAccordionToggle}
                        searchTerm={searchTerm}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
};
