import React from 'react'
import Header from './Sidebar_Header'
import Body from './Sidebar_Body'
import Footer from './Sidebar_Footer'
import { Box } from '@mui/material'

export default function Sidebar() {
    return (
        <Box
            position='sticky'
            top={2}
            left={0}
            minHeight='100vh'
            bgcolor={(theme) => theme.palette.mode === 'light' ? 'white' : '#0A1929'}
            padding={{ xs: 1, lg: 2 }}
            zIndex={10}
        >
            <Header />
            <Body />
            <Footer />
        </Box>
    )
}
