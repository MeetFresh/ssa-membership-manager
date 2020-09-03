import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const theme = createMuiTheme({
    overrides: {
        palette: {
            primary: {
                main: '#444444',
            },
            secondary: {
                main: '#888888',
            }
        },
        MuiStepIcon: {
            root: {
                '&$completed': {
                    color: 'gray',
                },
                '&$active': {
                    color: 'black',
                },
            },
            active: {},
            completed: {},
        },
        MuiOutlinedInput: {
            root: {
                position: 'relative',
                '& $notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: 'black',
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                },
                '&$focused $notchedOutline': {
                    borderColor: 'black',
                    borderWidth: 1,
                },
            },
        },
        MuiInput: {
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: '#888888',
                    // border:
                }
            }
        },
        MuiFormControl: {
            root: {
                '&$focused': {
                    borderColor: '#888888',
                    // border:
                }
            }
        },
        MuiLink: {
            root: {
                color: 'black',
            }
        }
    }
})