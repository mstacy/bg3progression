import { TextField } from "@mui/material";
import { useCallback } from "react";
import debounce from "lodash/debounce";
import { getPercentage } from "../utils";
import { checkboxValues } from "../page";

export const Header = ({
    checkedBoxes,
    onSearch,
}: {
    checkedBoxes: Record<string, checkboxValues>;
    onSearch: (searchTerm: string) => void;
}) => {
    const actCompletion = getPercentage(checkedBoxes, "region", "any");

    // Debounce the search callback
    const debouncedSearch = useCallback(
        (value: string) => {
            const handler = debounce((searchValue: string) => {
                onSearch(searchValue);
            }, 300);
            handler(value);
        },
        [onSearch]
    );

    return (
        <header className="fixed w-full top-0 bg-white z-10 p-4 shadow-md">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Act 1</h1>
                    <div
                        className="text-sm text-gray-600"
                        data-test="act-completion"
                    >
                        {actCompletion}% Complete
                    </div>
                </div>

                <TextField
                    placeholder="Search locations, quests, items..."
                    size="small"
                    onChange={(e) => debouncedSearch(e.target.value)}
                    className="w-64"
                    data-test="search-input"
                />
            </div>
        </header>
    );
};
