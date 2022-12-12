import React from 'react'
import { IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { NavLink } from 'react-router-dom'
import { SubmenuDesktop, SubmenuMobile } from './Submenu';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
export default function SidebarMenu({ to, icon, title, subMenu }) {
    const [openSubmenu, setOpenSubmenu] = useState(false);

    return (
        <Tippy
            interactive
            render={attrs => (
                subMenu ? (
                    <div tabIndex="-1" {...attrs}>
                        {subMenu.map((item, index) => <SubmenuMobile key={index} to={item.to} title={item.title} icon={item.icon} />)}
                    </div>
                ) : null
            )}
            placement='right-start'
            trigger='click'
            on
        >
            <NavLink to={to}>
                {({ isActive }) => (
                    <div className='flex flex-col items-center'>
                        <div
                            className={`${isActive ? 'bg-gray-200 dark:bg-[#243863]' : 'bg-transparent hover:bg-[#F6F6F6] dark:hover:bg-[#293752]'} p-1 sm:p-2 w-9 sm:w-12 lg:w-full rounded-md`}
                            onClick={() => setOpenSubmenu(prev => !prev)}
                        >

                            <div className='flex items-center justify-around gap-3 h-7'>
                                <div className='flex flex-col flex-1 lg:flex-none'>
                                    <IconButton disableRipple className='text-black dark:text-white p-0'>
                                        {icon}
                                    </IconButton>
                                </div>
                                <div className='hidden lg:flex items-center justify-between flex-1'>
                                    <div className='text-black dark:text-white font-medium'>{title}</div>
                                    {subMenu &&
                                        <IconButton disableRipple className='text-black dark:text-white p-0'>
                                            {openSubmenu && isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    }
                                </div>
                            </div>
                        </div>
                        {openSubmenu && isActive && subMenu &&
                            <div className='w-full grid gap-2 mt-2'>
                                {
                                    subMenu.map((item, index) => {
                                        return <SubmenuDesktop key={index} to={item.to} title={item.title} />
                                    })
                                }
                            </div>
                        }

                    </div>
                )}
            </NavLink>
        </Tippy>
    )
}
