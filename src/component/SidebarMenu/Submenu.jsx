import React from 'react'
import { IconButton, Typography } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { NavLink } from 'react-router-dom';

export default function Submenu({ to, title }) {

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
