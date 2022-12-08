import React, { ReactNode } from 'react';
import { MBAppBar } from './MBAppBar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FrameProps {
    children: ReactNode;
}

export function Frame(props: FrameProps) {
    return (
        <>
            <MBAppBar />

            {props.children}
        </>
    );
}

export default React.memo(Frame);
