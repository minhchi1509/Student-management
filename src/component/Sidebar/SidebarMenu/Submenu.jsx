import React from 'react'
import { IconButton, Typography } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { NavLink, useNavigate } from 'react-router-dom';

export const SubmenuDesktop = ({ to, title }) => {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <div className={`hidden lg:block ${isActive ? 'bg-gray-200 dark:bg-[#243863]' : 'bg-transparent hover:bg-[#F6F6F6] dark:hover:bg-[#293752]'} p-2 rounded-md`}>
                    <div className='flex items-center gap-3 h-6'>
                        <IconButton disableRipple className={`text-black dark:text-white ${isActive ? 'visible' : 'invisible'} scale-[0.5]`}>
                            <FiberManualRecordIcon />
                        </IconButton>
                        <Typography className=''>{title}</Typography>
                    </div>
                </div>
            )}
        </NavLink>
    )
}

export const SubmenuMobile = ({ to, title, icon }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col gap-3 w-40 p-2 shadow-lg rounded-md bg-white dark:bg-[#454647] lg:hidden'>
            <div
                className='flex items-center gap-3 p-1 hover:bg-gray-200 dark:hover:bg-[#3c3c3d] rounded-md cursor-pointer'
                onClick={() => navigate(to)}
            >
                <IconButton className='p-0' disableRipple>
                    {icon}
                </IconButton>
                <p>{title}</p>
            </div>
        </div>
    )
}