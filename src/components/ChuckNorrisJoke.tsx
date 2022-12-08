import { grey } from '@mercedes-benz/mui5-theme';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { ApiUrls } from '../../api/api/apiUrls';
import { useQuery } from '../common/rest/useQuery';

export interface ChucknorrisData {
    categories: [];
    created_at: string; //Date "2020-01-05 13:42:24.142371",
    icon_url: string; // "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    id: string; // "ySJBeJm9Sj6PnTspgWvWQQ",
    updated_at: string; ///Date "2020-01-05 13:42:24.142371",
    url: string; // "https://api.chucknorris.io/jokes/ySJBeJm9Sj6PnTspgWvWQQ",
    value: string; // "Chuck Norris overpassed the speed of light."
}

function ChuckNorrisJoke(props: { children: React.ReactNode | React.ReactNode[]; queryTrigger: number }) {
    const joke = useQuery<ChucknorrisData>(ApiUrls.chuckNorrisJokes.joke);
    return (
        <Box mt={4} padding={2} borderColor={grey[500]} border={1}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Data ({props.queryTrigger}): <Typography variant="body2">{joke?.value}</Typography>
            </Typography>
            {props.children}
        </Box>
    );
}

export default React.memo(ChuckNorrisJoke);
