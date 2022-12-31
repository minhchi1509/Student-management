import React from 'react'
import Logo from '../../assets/images/Logo.png';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material'
import { menuConfigs } from '../../configs';
import { MenuItem, CollapsibleMenuItem, Darkmode, Logout } from './components';

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
            <ListItem className='px-0 gap-3'>
                <ListItemAvatar className='flex-1 lg:flex-none min-w-0'>
                    <Avatar
                        alt='logo'
                        src={Logo}
                        className='w-10 h-10 lg:w-12 lg:h-12 mx-auto lg:mx-0 lg:scale-150'
                    />
                </ListItemAvatar>
                <ListItemText className='hidden lg:block'>
                    <Typography fontSize={30} fontWeight={700}>Sun*</Typography>
                </ListItemText>
            </ListItem>
            <List className='flex flex-col gap-2'>
                {menuConfigs.map((item, index) => (
                    item.subMenu ?
                        <CollapsibleMenuItem key={index} item={item} /> :
                        <MenuItem key={index} item={item} />
                ))}
            </List>
            <Darkmode />
            <Logout />
        </Box>
    )
}
