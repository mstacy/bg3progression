import type { Meta, StoryObj } from "@storybook/react";
import { QuestList } from "../QuestList";

const meta: Meta<typeof QuestList> = {
    component: QuestList,
    title: "Components/QuestList",
};

export default meta;
type Story = StoryObj<typeof QuestList>;

const mockData = {
    quests: [
        {
            name: "Find a Cure",
            link: "https://bg3.wiki/wiki/Find_a_Cure",
        },
        {
            name: "Save the Refugees",
            link: "https://bg3.wiki/wiki/Save_the_Refugees",
        },
    ],
    regionName: "Wilderness",
    locationName: "Ravaged Beach",
    checkedBoxes: {},
    onCheckboxChange: (name, values) => {
        console.log("Quest checkbox changed:", name, values);
    },
};

export const Default: Story = {
    args: mockData,
};

export const WithCheckedQuests: Story = {
    args: {
        ...mockData,
        checkedBoxes: {
            "Find a Cure": {
                isChecked: true,
                region: "Wilderness",
                location: "Ravaged Beach",
            },
        },
    },
};
