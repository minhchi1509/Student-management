import React from 'react'
import Logo from '../../../assets/images/Logo.png'
import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material'

export default function Header() {
    return (
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
    )
}
