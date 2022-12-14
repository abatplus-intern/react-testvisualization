import { Grid } from '@mui/material';
import Quadrant from './Quadrant';
import React from 'react';

// for styling and theming information refer to: https://pages.git.daimler.com/DaimlerUI/material-ui/v5/#/daimlerUI-general
// an theme explorer of the MB theme con be found at: https://pages.git.daimler.com/DaimlerUI/material-ui/v5/#/theme-override

function Testquadrant() {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={6}>
                <Quadrant></Quadrant>
            </Grid>
            <Grid xs={6}>
                <Quadrant></Quadrant>
            </Grid>
            <Grid xs={6}>
                <Quadrant></Quadrant>
            </Grid>
            <Grid xs={6}>
                <Quadrant></Quadrant>
            </Grid>
        </Grid>
    );
}

export default React.memo(Testquadrant);
