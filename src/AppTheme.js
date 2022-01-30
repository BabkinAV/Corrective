import { createTheme } from '@mui/material/styles';

//1 rem = 16px

let theme = createTheme({
  palette: {
    primary: {
      main: '#000',
      light: '#737B7D',
      lighter: '#737B7D8F',
      darker: '#292929'
    },
    secondary: {
      main: '#3C64B1',
    },
    background: {
      main: 'rgba(60, 100, 177, 0.1)',
      secondary: '#EBEFF7',
      ternary: 'rgba(235, 239, 247, 0.72)'
    },
    grey: {
      main: '#737B7D',
      
    },
    white: {
      main: '#fff',
    },
  },
});

theme = createTheme(theme, {
  typography: {
    allVariants: {
      color: 'black',
    },
    h1: {
      fontSize: '3.5rem',
      '@media (max-width:900px)': {
        fontSize: '2.5rem',
      },
      fontFamily: ['"Mulish"', 'sans-serif'].join(','),
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      '@media (max-width:900px)': {
        fontSize: '1.75rem',
      },
      fontFamily: ['"Mulish"', 'sans-serif'].join(','),
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      '@media (max-width:900px)': {
        fontSize: '1.25rem',
      },
      fontFamily: ['"Mulish"', 'sans-serif'].join(','),
      fontWeight: 500,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body2: 'span',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        textPrimary: {
          borderRadius: 0,
          minWidth: 'unset',
          borderBottom: '2px solid transparent',
          padding: '0',
          '&:hover': {
            backgroundColor: 'unset',
            borderBottom: '2px solid black',
          },
        },
        containedSecondary: {
          padding: '6px 8px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        filled: {
          color: '#737B7D',
          '&.Mui-focused': {
            color: '#000',
          },
        },
        outlined: {
          color: '#737B7D',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          maxHeight: '9rem',
          boxShadow: 'unset',
        },
        listbox: {
          padding: '0px',
        },
        option: {
          borderBottom: '1px solid #737B7D',
          paddingTop: '10px !important',
          paddingBottom: '10px !important',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },

    MuiTextField: {
        styleOverrides: {

          root:{
            '&.Authorization_Form_Field .MuiFormHelperText-root': {
              position: 'absolute',
              bottom: '-0.35rem',
            },

           
          },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            color: theme.palette.primary.light,
          },
          '&.Mui-selected .MuiTableCell-root': {
            color: theme.palette.primary.main,
          },
          '&.Mui-selected .MuiChip-root': {
            opacity: 1,
          },
          '& .MuiChip-root': {
            opacity: 0.85,
          },
          '&.Mui-selected .MuiLink-root': {
            opacity: 1,
          },
          '& .MuiLink-root': {
            opacity: 0.85,
          },
        },
        head: {
          '& .MuiTableCell-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiCheckbox-root': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
  },
});

const AppTheme = createTheme(theme);

export default AppTheme;
