import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { SearchStudent, AddStudent, TableData } from './components';

export default function Home() {
    return (
        <Box padding={3}>
            <Typography fontWeight='bold' variant='h4'>Quản lý sinh viên</Typography>
            <Box marginTop={3}>
                <Grid container spacing={2} columns={{ xs: 5, md: 12 }}>
                    <Grid item xs>
                        <SearchStudent />
                    </Grid>
                    <Grid item xs={2}>
                        <AddStudent />
                    </Grid>
                </Grid>
            </Box>
            <Box marginTop={3}>
                <TableData />
            </Box>
        </Box>
    )
}
