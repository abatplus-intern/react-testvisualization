import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTranslation } from '../../common/i18n/useTranslation';

const useStyles = makeStyles()({
    loading: {},
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoadingProps {}

//TODO: use Skeleton components (e.g. https://v4.mui.com/components/skeleton/) and React-Suspense instaed of old style loading indicator like spinners.
export function Loading(_props: LoadingProps) {
    const { classes } = useStyles();
    const t = useTranslation();
    return (
        <Typography variant="h3" className={classes.loading}>
            {t('loading')}
        </Typography>
    );
}
