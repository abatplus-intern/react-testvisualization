import { makeStyles } from 'tss-react/mui';
import { ClassNameMap, CombinedClassKey, SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

const useStyles = makeStyles()(() => ({}));

export function MessagesProvider(props: { children: ReactNode }) {
    const { classes } = useStyles();

    return (
        <SnackbarProvider
            dense
            hideIconVariant
            classes={classes as unknown as Partial<ClassNameMap<CombinedClassKey>>} // CombinedClassKey misses 'contentRoot', so we need the cast here
            preventDuplicate={true}
            maxSnack={3}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
            }}
        >
            {props.children}
        </SnackbarProvider>
    );
}
