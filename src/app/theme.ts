import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {main: '#2196f3'},
        secondary: {main: '#64b5f6'},
        background: {default: '#f0f7ff', paper: '#ffffff'},
        text: {primary: '#0d47a1'}
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
            root: {
                borderRadius: "12px",
                paddingTop: "10px",
                paddingBottom: "10px",
                transition: "0.2s",
            },
            },
        },
    },

})

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#90caf9'},
        secondary: {main: '#64b5f6'},
        background: {default: '#0d1117', paper: '#161b22'},
        text: {primary: '#e3f2fd'}
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
            root: {
                borderRadius: "12px",
                paddingTop: "10px",
                paddingBottom: "10px",
                transition: "0.2s",
            },
            },
        },
    },

})
