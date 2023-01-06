import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

export default function Loading({ isOpen }) {
    return (
        <Backdrop
            open={isOpen}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    )
}
