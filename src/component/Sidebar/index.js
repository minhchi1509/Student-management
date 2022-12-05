import React from 'react'
import Logo from '../../assets/images/Logo.png'
import { Typography } from '@mui/material';
import { menuList } from './menuList';
import SidebarMenu from '../SidebarMenu';
import DarkmodeToggle from '../DarkmodeToggle';

export default function Sidebar() {

    return (
        <div className='col-span-2 lg:col-span-3 bg-white dark:bg-[#1C2536]'>
            <div className='sticky top-5 w-full px-2 lg:px-4'>

                {/* Header */}
                <div className='flex items-center gap-3 mb-4'>
                    <div className='flex-1 lg:flex-none'>
                        <img alt='logo' src={Logo} className='w-10 h-10 lg:w-12 lg:h-12 mx-auto lg:mx-0 lg:scale-150' />
                    </div>
                    <Typography className='font-bold text-[30px] hidden lg:block'>Sun*</Typography>
                </div>

                {/* Body */}
                <div className='grid gap-3 py-5'>
                    {
                        menuList.map((menu, index) => {
                            return <SidebarMenu
                                key={index}
                                to={menu.to}
                                title={menu.title}
                                icon={menu.icon}
                                subMenu={menu.submenu}
                            />
                        })
                    }
                </div>
                <DarkmodeToggle />

            </div>
        </div>
    )
}
