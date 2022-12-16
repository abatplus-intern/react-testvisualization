import React, { ReactNode, Suspense } from 'react';
import { Typography } from '@mui/material';

interface RouteProps {
    children: ReactNode;
}
function MainRoute(props: RouteProps) {
    return <Suspense fallback={<Typography>Loading content...</Typography>}>{props.children}</Suspense>;
}

export default React.memo(MainRoute);
