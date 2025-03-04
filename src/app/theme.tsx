import { createTheme } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// Create a theme instance
export const theme = createTheme({
    // You can customize your theme here
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
        // background: {
        //     default: "#0C0807",
        //     paper: "#0C0807",
        // },
        // text: {
        //     primary: "#ffffff",
        // },
    },
    typography: {
        // fontFamily: "Alegreya, serif",
    },
    components: {
        MuiAccordion: {
            defaultProps: {
                disableGutters: true,
                elevation: 0,
                slots: {
                    heading: "div",
                },
            },
            styleOverrides: {
                root: {
                    "&:before": {
                        display: "none",
                    },
                },
            },
        },
        MuiAccordionSummary: {
            defaultProps: {
                expandIcon: <ArrowRightIcon />,
            },
            styleOverrides: {
                root: {
                    flexDirection: "row-reverse",
                },
                expandIconWrapper: {
                    "&.Mui-expanded": {
                        transform: "rotate(90deg)",
                    },
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                },
            },
        },
    },
});
