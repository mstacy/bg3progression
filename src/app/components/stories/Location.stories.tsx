import type { Meta, StoryObj } from "@storybook/react";
import { Location } from "../Location";
import { checkboxValues } from "../../page";

const meta = {
    component: Location,
    title: "Components/Location",
} satisfies Meta<typeof Location>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
    location: {
        name: "Ravaged Beach",
        link: "https://bg3.wiki/wiki/Ravaged_Beach",
        quests: [
            {
                name: "Find a Cure",
                link: "https://bg3.wiki/wiki/Find_a_Cure",
            },
        ],
        interactions: [],
        items: [
            {
                name: "Gloves of Power",
                link: "https://bg3.wiki/wiki/Gloves_of_Power",
            },
        ],
    },
    regionName: "Wilderness",
    checkedBoxes: {},
    onCheckboxChange: ({
        name,
        values,
    }: {
        name: string;
        values: checkboxValues;
    }) => {
        console.log("Checkbox changed:", name, values);
    },
    getPercentage: () => 0,
    index: 0,
};

export const Default: Story = {
    args: mockData,
};

export const WithProgress: Story = {
    args: {
        ...mockData,
        checkedBoxes: {
            "Find a Cure": {
                isChecked: true,
                region: "Wilderness",
                location: "Ravaged Beach",
            },
        },
        getPercentage: () => 50,
    },
};
