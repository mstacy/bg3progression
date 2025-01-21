import type { Meta, StoryObj } from "@storybook/react";
import { Region } from "../Region";
import { checkboxValues } from "../../page";

const meta: Meta<typeof Region> = {
    component: Region,
    title: "Components/Region",
};

export default meta;
type Story = StoryObj<typeof Region>;

const mockData = {
    region: {
        name: "Wilderness",
        link: "https://bg3.wiki/wiki/Wilderness",
        locations: [
            {
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
        ],
    },
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
