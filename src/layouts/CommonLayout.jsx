import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import useCustomTheme from 'hooks/useCustomTheme';

export default function CommonLayout() {
    const theme = useCustomTheme();

    return (
        <Box
            minHeight='100vh'
            bgcolor={theme => theme.palette.mode === 'light' ? '#f9fafb' : '#1A2027'}
            className={theme.palette.mode}
        >
            <Outlet />
        </Box>
    )
}
