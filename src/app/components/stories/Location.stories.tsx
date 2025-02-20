import type { Meta, StoryObj } from "@storybook/react";
import Location from "../Location";
import { ProgressProvider } from "../../context/ProgressContext";

const meta: Meta<typeof Location> = {
    title: "Components/Location",
    component: Location,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <ProgressProvider
                initialState={{
                    accordions: { "location-Test Region-Test Location": true },
                }}
            >
                <Story />
            </ProgressProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Location>;

export const Default: Story = {
    args: {
        location: {
            name: "Test Location",
            link: "https://example.com",
            quests: [
                { name: "Quest 1", link: "https://example.com/quest1" },
                { name: "Quest 2", link: "https://example.com/quest2" },
            ],
            interactions: [
                { name: "Interaction 1", link: "https://example.com/int1" },
            ],
            items: [{ name: "Item 1", link: "https://example.com/item1" }],
            companions: ["Companion 1", "Companion 2"],
        },
        regionName: "Test Region",
        searchTerm: "",
    },
};

export const Expanded: Story = {
    decorators: [
        (Story) => (
            <ProgressProvider
                initialState={{
                    accordions: { "location-Test Region-Test Location": true },
                }}
            >
                <Story />
            </ProgressProvider>
        ),
    ],
    args: {
        ...Default.args,
    },
};

export const WithSearch: Story = {
    args: {
        ...Default.args,
        searchTerm: "quest",
    },
};
