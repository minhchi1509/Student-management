import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleMode } from '../../redux/features/modeSlice';
import { IconButton } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';

export default function DarkmodeToggle() {
    const dispatch = useDispatch();

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 rounded-md bg-[#F6F6F6] dark:bg-[#192030] p-1'>
            <div
                className='flex items-center justify-center h-10 bg-white dark:bg-transparent rounded-lg cursor-pointer'
                onClick={() => dispatch(toggleMode('light'))}
            >
                <IconButton disableRipple className='text-black dark:text-gray-300'>
                    <WbSunnyOutlinedIcon />
                </IconButton>
                <p className='font-bold hidden xl:block dark:text-gray-300'>Light</p>
            </div>
            <div
                className='flex items-center justify-center h-10 bg-transparent dark:bg-[#293752] rounded-lg cursor-pointer'
                onClick={() => dispatch(toggleMode('dark'))}
            >
                <IconButton disableRipple className='text-gray-500 dark:text-white'>
                    <NightlightOutlinedIcon />
                </IconButton>
                <p className='text-gray-500 dark:text-white font-bold hidden xl:block'>Dark</p>
            </div>
        </div>
    )
}
