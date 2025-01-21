import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Location } from "./Location";
import { checkboxValues } from "../page";

export const Region = ({
    region,
    checkedBoxes,
    onCheckboxChange,
    getPercentage,
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
    getPercentage: (
        slug: keyof checkboxValues,
        value: string
    ) => number | string;
}) => {
    const percentComplete = getPercentage("region", region.name);

    return (
        <Accordion
            key={region.name}
            disableGutters
            slots={{
                heading: "div",
            }}
        >
            <AccordionSummary>
                <div className="flex justify-between w-full">
                    <h2>{region.name}</h2>
                    {percentComplete}%
                </div>
            </AccordionSummary>

            <AccordionDetails>
                {region.locations.map((location, index) => (
                    <Location
                        key={location.name}
                        location={location}
                        regionName={region.name}
                        checkedBoxes={checkedBoxes}
                        onCheckboxChange={onCheckboxChange}
                        getPercentage={getPercentage}
                        index={index}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
};
