import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

function NewRelease() {
    // function keyPress(key: any) {
    //     if (key.key === 'Enter') {
    //         console.log('value =', key.target.value);
    //     }
    // }

    const [release, setRelease] = useState<number>(0.0);

    function releaseHandler(event: any) {
        setRelease(event.target.value);
    }

    function refreshRelease() {
        if (release != 0) {
            console.log('Refresh Release ' + release);
        } else {
            console.log('Release is not set');
        }
    }

    function deleteRelease() {
        if (release != 0) {
            console.log('Delete Release ' + release);
        } else {
            console.log('Release is not set');
        }
    }

    return (
        <Grid container alignItems="center" spacing={1} justifyContent="flex-end">
            <Grid item>
                <Button variant="contained" color="success" onClick={refreshRelease}>
                    Refresh
                </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" color="error" onClick={deleteRelease}>
                    Delete
                </Button>
            </Grid>
            <Grid item>
                <TextField
                    id="outlined-basic"
                    label="Release"
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{ inputProps: { min: 2020, step: 0.1 } }}
                    onChange={releaseHandler}
                />
            </Grid>
        </Grid>
    );
}

export default React.memo(NewRelease);
