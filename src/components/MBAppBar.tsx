import { Theme } from '@mui/material/styles';
import { MBAppBar as AppBar } from '@mercedes-benz/mbui-comps';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()((theme: Theme) => ({
    colorWhite: {
        color: theme.palette.common.white,
    },
}));


export function MBAppBar() {
    const { classes } = useStyles();
    return (
        <AppBar
            leftContent={
                <Grid container alignItems="center">
                    <Grid item>
                        <IconButton size="large" edge="start" aria-label="menu" className={classes.colorWhite}>
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" noWrap component="div">
                            React Template
                        </Typography>
                    </Grid>
                </Grid>
            }
            rightContent={
                <Grid container alignItems="center" justifyContent="flex-end">
                    <Grid item>
                        <IconButton size="large" edge="start" aria-label="menu" className={classes.colorWhite}>
                            <SettingsIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton size="large" edge="start" aria-label="menu" className={classes.colorWhite}>
                            <PersonIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            }
        />
    );
}
