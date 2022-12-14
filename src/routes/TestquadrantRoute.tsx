import React, { Suspense } from 'react';
import Testquadrant from '../components/Testquadrant';
import { Typography } from '@mui/material';

function TestquadrantRoute() {
    return (
        <Suspense fallback={<Typography>Loading main content...</Typography>}>
            <Testquadrant />
        </Suspense>
    );
}

export default React.memo(TestquadrantRoute);
