import { LightTheme as MBTheme } from '@mercedes-benz/mui5-theme';
import { createTheme, Theme as MuiTheme } from '@mui/material/styles';

export interface AppTheme extends MuiTheme {
    // Nothing to add here
}

export const theme: AppTheme = createTheme({
    ...MBTheme,
});
