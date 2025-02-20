import type { Meta, StoryObj } from "@storybook/react";
import { Region } from "../Region";
import { ProgressProvider } from "../../context/ProgressContext";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "@/app/theme";

const meta: Meta<typeof Region> = {
    title: "Components/Region",
    component: Region,
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
type Story = StoryObj<typeof Region>;

export const Default: Story = {
    args: {
        region: {
            name: "Test Region",
            link: "https://example.com",
            locations: [
                {
                    name: "Location 1",
                    link: "https://example.com/loc1",
                    quests: [
                        { name: "Quest 1", link: "https://example.com/quest1" },
                    ],
                    interactions: [
                        {
                            name: "Interaction 1",
                            link: "https://example.com/int1",
                        },
                    ],
                    items: [
                        { name: "Item 1", link: "https://example.com/item1" },
                    ],
                    companions: ["Companion 1"],
                },
                {
                    name: "Location 2",
                    link: "https://example.com/loc2",
                    quests: [],
                    interactions: [],
                    items: [],
                },
            ],
        },
        searchTerm: "",
    },
};

export const Expanded: Story = {
    decorators: [
        (Story) => (
            <ProgressProvider
                initialState={{
                    accordions: { "region-Test Region": true },
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

export const FullyExpanded: Story = {
    decorators: [
        (Story) => (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProgressProvider
                    initialState={{
                        accordions: {
                            "region-Test Region": true,
                            "location-Test Region-Location 1": true,
                            "location-Test Region-Location 2": true,
                        },
                    }}
                >
                    <Story />
                </ProgressProvider>
            </ThemeProvider>
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
