import React, { useState } from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { Collapse, List } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

export default function CollapsibleMenuItem({ item }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { subMenu } = item;

    const handleClickItem = (subItem) => {
        navigate(subItem.path);
        setOpen(false);
    }

    return (
        <Tippy
            placement='right-start'
            interactive
            visible={open}
            onClickOutside={() => setOpen(false)}
            render={attrs => (
                <div tabIndex="-1" {...attrs}>
                    <Paper elevation={3} className='w-48 p-2 lg:hidden dark:bg-[#2d2e2e]'>
                        <List disablePadding>
                            {
                                subMenu.map((subItem, index) => (
                                    <ListItemButton
                                        key={index}
                                        className='rounded-lg gap-5 p-1'
                                        onClick={() => handleClickItem(subItem)}
                                    >
                                        <ListItemIcon className='min-w-0'>
                                            {subItem.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={subItem.title} />
                                    </ListItemButton>
                                ))
                            }
                        </List>
                    </Paper>
                </div>
            )}
        >
            <div>
                <ListItemButton className='rounded-lg px-1 sm:px-3 gap-5' onClick={() => setOpen(!open)}>
                    <ListItemIcon className='min-w-0 flex-1 lg:flex-none justify-around'>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} className='hidden lg:block' />
                    <div className='hidden lg:block'>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </div>
                </ListItemButton>
                <Collapse in={open} className='hidden lg:block mt-1'>
                    <List disablePadding className='flex flex-col gap-2'>
                        {subMenu.map((subItem, index) => (
                            <NavLink to={subItem.path} key={index}>
                                {({ isActive }) => (
                                    <ListItemButton className={`pl-5 rounded-lg gap-3 ${isActive ? 'bg-gray-200 dark:bg-[#243863]' : 'hover:bg-[#F5F5F5] dark:hover:bg-[#2E3646]'}`}>
                                        <ListItemIcon className='min-w-0'>
                                            {subItem.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={subItem.title} />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        ))}
                    </List>
                </Collapse>
            </div>
        </Tippy>
    )
}
