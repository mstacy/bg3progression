import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@mui/material";
import { Location } from "./Location";
import { checkboxValues } from "../page";
import { getPercentage } from "../utils";

export const Region = ({
    region,
    checkedBoxes,
    onCheckboxChange,
}: {
    region: {
        name: string;
        link: string;
        locations: Location[];
    };
    checkedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (params: {
        name: string;
        values: checkboxValues;
    }) => void;
}) => {
    const percentComplete = getPercentage(checkedBoxes, "region", region.name);

    return (
        <Accordion
            key={region.name}
            disableGutters
            slots={{
                heading: "div",
            }}
            data-test={`region-accordion-${region.name}`}
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
                {region.locations.map(
                    (
                        location
                        // index
                    ) => (
                        <Location
                            key={location.name}
                            location={location}
                            regionName={region.name}
                            checkedBoxes={checkedBoxes}
                            onCheckboxChange={onCheckboxChange}
                            // index={index}
                        />
                    )
                )}
            </AccordionDetails>
        </Accordion>
    );
};
