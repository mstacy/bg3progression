import type { Meta, StoryObj } from "@storybook/react";
import GenericListItem from "../GenericListItem";
import { ProgressProvider } from "../../context/ProgressContext";

const meta: Meta<typeof GenericListItem> = {
    title: "Components/GenericListItem",
    component: GenericListItem,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <ProgressProvider>
                <Story />
            </ProgressProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof GenericListItem>;

export const Default: Story = {
    args: {
        item: {
            name: "Test Item",
            link: "https://example.com",
        },
        regionName: "Test Region",
        locationName: "Test Location",
    },
};

export const WithoutLink: Story = {
    args: {
        item: {
            name: "Test Item",
            link: "",
        },
        regionName: "Test Region",
        locationName: "Test Location",
    },
};
