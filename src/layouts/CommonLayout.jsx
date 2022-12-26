import React from 'react'
import { Box } from '@mui/material'
import useCustomTheme from '../hooks/useCustomTheme'
import { Outlet } from 'react-router-dom';

export default function CommonLayout({ children }) {
    const theme = useCustomTheme();

    return (
        <Box
            minHeight='100vh'
            bgcolor={theme => theme.palette.mode === 'light' ? '#f9fafb' : '#18181b'}
            className={theme.palette.mode}
        >
            <Outlet />
        </Box>
    )
}
