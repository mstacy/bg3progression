import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../Header";
import { ProgressProvider } from "../../context/ProgressContext";

const meta: Meta<typeof Header> = {
    title: "Components/Header",
    component: Header,
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
type Story = StoryObj<typeof Header>;

export const Default: Story = {
    args: {
        onSearch: (searchTerm: string) =>
            console.log("Search term:", searchTerm),
    },
};
