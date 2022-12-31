import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function SidebarItemSingle({ item }) {
    return (
        <NavLink to={item.path} >
            {({ isActive }) => (
                <ListItemButton className={`rounded-lg px-1 sm:px-3 gap-5 ${isActive ? 'bg-gray-200 dark:bg-[#243863]' : 'hover:bg-[#F5F5F5] dark:hover:bg-[#2E3646]'}`}>
                    <ListItemIcon className='min-w-0 flex-1 lg:flex-none justify-around'>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} className='hidden lg:block' />
                </ListItemButton>
            )}
        </NavLink>
    )
}
