import React, { Suspense } from 'react';
import Main from '../components/Main';
import { Typography } from '@mui/material';

function MainRoute() {
    return (
        <Suspense fallback={<Typography>Loading main content...</Typography>}>
            <Main />
        </Suspense>
    );
}

export default React.memo(MainRoute);
