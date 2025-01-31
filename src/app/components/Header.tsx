import { TextField } from "@mui/material";

export const Header = ({
    onSearch,
    actCompletion,
}: {
    onSearch: (searchTerm: string) => void;
    actCompletion: () => number;
}) => {
    // Throttle the search callback
    let timeout: NodeJS.Timeout | null = null;
    const throttledSearch = (searchValue: string) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            onSearch(searchValue);
        }, 1000);
    };

    return (
        <header className="fixed w-full top-0 bg-white z-10 p-4 shadow-md">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Act 1</h1>
                    <div
                        className="text-sm text-gray-600"
                        data-test="act-completion"
                    >
                        {actCompletion()}% Complete
                    </div>
                </div>

                <TextField
                    placeholder="Search locations, quests, items..."
                    size="small"
                    onChange={(e) => throttledSearch(e.target.value)}
                    className="w-64"
                    data-test="search-input"
                />
            </div>
        </header>
    );
};
