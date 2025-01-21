import type { Meta, StoryObj } from "@storybook/react";
import { ItemList } from "../ItemList";
import { checkboxValues } from "../../page";

const meta: Meta<typeof ItemList> = {
    component: ItemList,
    title: "Components/ItemList",
};

export default meta;
type Story = StoryObj<typeof ItemList>;

const mockData = {
    items: [
        {
            name: "Gloves of Power",
            link: "https://bg3.wiki/wiki/Gloves_of_Power",
        },
        {
            name: "Ring of Protection",
            link: "https://bg3.wiki/wiki/Ring_of_Protection",
        },
    ],
    regionName: "Wilderness",
    locationName: "Ravaged Beach",
    checkedBoxes: {},
    onCheckboxChange: (name: string, values: checkboxValues) => {
        console.log("Item checkbox changed:", name, values);
    },
};

export const Default: Story = {
    args: mockData,
};

export const WithCheckedItems: Story = {
    args: {
        ...mockData,
        checkedBoxes: {
            "Gloves of Power": {
                isChecked: true,
                region: "Wilderness",
                location: "Ravaged Beach",
            },
        },
    },
};
