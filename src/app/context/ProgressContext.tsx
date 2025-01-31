import { createContext, useContext, useEffect, useState } from "react";
import { checkboxValues } from "../page";
import { getPercentage } from "../utils";

type ProgressContextType = {
    accordionsOpen: Record<string, boolean>;
    initialAccordionsOpen: Record<string, boolean>;
    checkedBoxes: Record<string, checkboxValues>;
    initialCheckedBoxes: Record<string, checkboxValues>;
    handleAccordionToggle: (accordionId: string) => void;
    handleCheckboxChange: (params: {
        name: string;
        values: checkboxValues;
    }) => void;
    getPercentageComplete: (type: keyof checkboxValues, name: string) => number;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
    undefined
);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const accordionOpenKey = "accordionsOpen";
    const checkedBoxesKey = "act1";

    const [accordionsOpen, setAccordionsOpen] = useState<
        Record<string, boolean>
    >({});
    const [initialAccordionsOpen, setInitialAccordionsOpen] = useState<
        Record<string, boolean>
    >({});
    const [checkedBoxes, setCheckedBoxes] = useState<
        Record<string, checkboxValues>
    >({});
    const [initialCheckedBoxes, setInitialCheckedBoxes] = useState<
        Record<string, checkboxValues>
    >({});

    // Load data from localStorage
    useEffect(() => {
        const savedCheckedBoxes = localStorage.getItem(checkedBoxesKey);
        const savedAccordionsOpen = localStorage.getItem(accordionOpenKey);

        const initialCheckedBoxes = JSON.parse(savedCheckedBoxes || "{}");
        if (Object.keys(initialCheckedBoxes).length) {
            setCheckedBoxes(initialCheckedBoxes);
            setInitialCheckedBoxes({ ...initialCheckedBoxes });
        }

        const initialAccordionsOpen = JSON.parse(savedAccordionsOpen || "{}");
        if (Object.keys(initialAccordionsOpen).length) {
            setAccordionsOpen(initialAccordionsOpen);
            setInitialAccordionsOpen({ ...initialAccordionsOpen });
        }
    }, []);

    // Save data to localStorage
    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem(checkedBoxesKey, JSON.stringify(checkedBoxes));
        }, 1000);
        return () => clearTimeout(handler);
    }, [checkedBoxes]);

    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem(
                accordionOpenKey,
                JSON.stringify(accordionsOpen)
            );
        }, 1000);
        return () => clearTimeout(handler);
    }, [accordionsOpen]);

    const handleAccordionToggle = (accordionId: string) => {
        setAccordionsOpen((current) => ({
            ...current,
            [accordionId]: !current[accordionId],
        }));
    };

    const handleCheckboxChange = ({
        name,
        values,
    }: {
        name: string;
        values: checkboxValues;
    }) => {
        setCheckedBoxes((current) => ({
            ...current,
            [name]: values,
        }));
    };

    const getPercentageComplete = (
        type: keyof checkboxValues,
        name: string
    ) => {
        return getPercentage(checkedBoxes, type, name);
    };

    return (
        <ProgressContext.Provider
            value={{
                accordionsOpen,
                initialAccordionsOpen,
                checkedBoxes,
                initialCheckedBoxes,
                handleAccordionToggle,
                handleCheckboxChange,
                getPercentageComplete,
            }}
        >
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
}
