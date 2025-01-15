import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Location } from "./Location";
import { checkboxValues } from "../page";

type RegionProps = {
    region: {
        name: string;
        link: string;
        locations: {
            name: string;
            link: string;
            quests: {
                name: string;
                link: string;
            }[];
            items: {
                name: string;
                link: string;
            }[];
        }[];
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
};

export const Region = ({
    region,
    checkedBoxes,
    onCheckboxChange,
    getPercentage,
}: RegionProps) => {
    const percentComplete = getPercentage("region", region.name);

    return (
        <Accordion key={region.name} disableGutters>
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
