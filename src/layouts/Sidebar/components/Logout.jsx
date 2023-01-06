import React, { useState, useRef } from 'react';
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemAvatar, ListItemText, Typography, Paper, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import { setCurrentUser } from '../../../redux/features/userSlice';
import { resetStudentList } from '../../../redux/features/studentSlice';
import { Confirmation } from '../../../common/Modal';

export default function Logout() {
    const [openPopper, setOpenPopper] = useState(false);
    const confirmationRef = useRef(null);
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickItem = () => {
        setOpenPopper(false);
        confirmationRef.current.show();
    }

    const handleLogout = () => {
        localStorage.setItem('currentUser', null);
        dispatch(setCurrentUser(null));
        dispatch(resetStudentList());
        navigate('/login');
    }

    return (
        <>
            <Tippy
                placement='right-start'
                interactive
                visible={openPopper}
                onClickOutside={() => setOpenPopper(false)}
                render={attrs => (
                    <div tabIndex="-1" {...attrs}>
                        <Paper elevation={3} className='w-48 p-2 lg:hidden dark:bg-[#2d2e2e]'>
                            <ListItemButton
                                className='rounded-lg gap-5 p-1'
                                onClick={handleClickItem}
                            >
                                <ListItemIcon className='min-w-0'>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary='Đăng xuất' />
                            </ListItemButton>
                        </Paper>
                    </div>
                )}
            >
                <ListItem className='mt-5 justify-between px-0 sm:px-3'>
                    <ListItemAvatar
                        className='flex-1 min-w-0 lg:min-w-[56px]'
                        onClick={() => setOpenPopper(!openPopper)}
                    >
                        <Avatar
                            alt='avt'
                            src={currentUser?.avatarImage}
                            className='mx-auto lg:mx-0 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer bg-gray-400'
                        >
                            {currentUser?.lastName?.[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className='hidden xl:block'>
                        <Typography>Welcome,</Typography>
                        <Typography fontSize={20} fontWeight={700}>
                            {currentUser?.lastName}
                        </Typography>
                    </ListItemText>
                    <IconButton className='hidden lg:flex' onClick={() => confirmationRef.current.show()}>
                        <LogoutIcon />
                    </IconButton>
                </ListItem>
            </Tippy>
            <Confirmation
                ref={confirmationRef}
                title='Xác nhận đăng xuất'
                content='Bạn có chắc muốn đăng xuất'
                handleAction={handleLogout}
            />
        </>
    )
}
