import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from '../common/i18n/useTranslation';
import config from '../configuration/configuration';
import ChuckNorrisJoke from './ChuckNorrisJoke';
import { Theme } from '@mui/material/styles';
import { queryPromiseCache } from '../common/rest/useQuery';

// for styling and theming information refer to: https://pages.git.daimler.com/DaimlerUI/material-ui/v5/#/daimlerUI-general
// an theme explorer of the MB theme con be found at: https://pages.git.daimler.com/DaimlerUI/material-ui/v5/#/theme-override

const useStyles = makeStyles()((theme: Theme) => ({
    mainContainer: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(2),
    },
}));

/**
 * Main component.
 */
function Main() {
    const translate = useTranslation();
    const { classes } = useStyles();
    const [counter, setCounter] = useState<number>(0);
    const [queryCount, setQueryCount] = useState<number>(0);

    return (
        <Container className={classes.mainContainer}>
            <Typography variant="h1">{translate('app_title')}</Typography>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                <Grid item>
                    <Button variant="outlined" onClick={() => setCounter(counter + 1)}>
                        Click {counter}
                    </Button>
                </Grid>

                <Grid item>
                    <Button color="secondary" variant="contained" onClick={() => setCounter(counter + 1)}>
                        Click {counter}
                    </Button>
                </Grid>
            </Grid>
            <Box mt={4}>
                <Typography variant="subtitle2">
                    API-Endpoint is configured to: <Typography variant="body2">{config.apiEndpoint}</Typography>
                </Typography>
            </Box>
            <ChuckNorrisJoke queryTrigger={queryCount}>
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                        queryPromiseCache.clear();
                        setQueryCount(queryCount + 1);
                    }}
                >
                    Reload data
                </Button>
            </ChuckNorrisJoke>
        </Container>
    );
}

export default React.memo(Main);
