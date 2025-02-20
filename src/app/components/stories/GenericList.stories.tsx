import type { Meta, StoryObj } from "@storybook/react";
import GenericList from "../GenericList";

const meta: Meta<typeof GenericList> = {
    title: "Components/GenericList",
    component: GenericList,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GenericList>;

export const Default: Story = {
    args: {
        items: [
            { name: "Quest 1", link: "https://example.com/quest1" },
            { name: "Quest 2", link: "https://example.com/quest2" },
            { name: "Quest 3", link: "https://example.com/quest3" },
        ],
        title: "Quests",
        regionName: "Test Region",
        locationName: "Test Location",
    },
};
