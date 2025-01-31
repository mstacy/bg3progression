import { checkboxValues } from "../page";
import GenericListItem from "./GenericListItem";

export type ListItem = {
    name: string;
    link: string;
};

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
    initialCheckedBoxes,
    onCheckboxChange,
}: GenericListProps) => {
    return (
        <>
            <h4>{title}</h4>
            <div className="flex flex-col">
                {items.map((item) => (
                    <GenericListItem
                        key={`${item.name}-${regionName}-${locationName}`}
                        item={item}
                        regionName={regionName}
                        locationName={locationName}
                        initialChecked={
                            initialCheckedBoxes[item.name]?.isChecked
                        }
                        onCheckboxChange={onCheckboxChange}
                    />
                ))}
            </div>
        </>
    );
};

export default GenericList;
