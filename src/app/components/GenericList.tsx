import GenericListItem from "./GenericListItem";
import { checkboxValues } from "../page";
import { ListItem } from "./GenericListItem";

type GenericListProps = {
    items: ListItem[];
    title: string;
    regionName: string;
    locationName: string;
    initialCheckedBoxes: Record<string, checkboxValues>;
    onCheckboxChange: (name: string, values: checkboxValues) => void;
};

const GenericList = ({
    items,
    title,
    regionName,
    locationName,
}: Omit<GenericListProps, "initialCheckedBoxes" | "onCheckboxChange">) => {
    return (
        <>
            <h4 data-test={`list-name`}>{title}</h4>
            <div className="flex flex-col">
                {items.map((item) => (
                    <GenericListItem
                        key={`${item.name}-${regionName}-${locationName}`}
                        item={item}
                        regionName={regionName}
                        locationName={locationName}
                    />
                ))}
            </div>
        </>
    );
};

export default GenericList;
