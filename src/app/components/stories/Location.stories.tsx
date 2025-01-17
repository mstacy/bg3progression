import type { Meta, StoryObj } from "@storybook/react";
import { Location } from "../Location";

const meta: Meta<typeof Location> = {
    component: Location,
    title: "Components/Location",
};

export default meta;
type Story = StoryObj<typeof Location>;

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
        items: [
            {
                name: "Gloves of Power",
                link: "https://bg3.wiki/wiki/Gloves_of_Power",
            },
        ],
    },
    regionName: "Wilderness",
    checkedBoxes: {},
    onCheckboxChange: ({ name, values }) => {
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
