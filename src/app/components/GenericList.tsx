import { useProgress } from "../context/ProgressContext";
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
    const { initialCheckedBoxes } = useProgress();

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
                    />
                ))}
            </div>
        </>
    );
};

export default GenericList;
