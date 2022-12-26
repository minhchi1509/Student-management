import React, { useState } from 'react'
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemAvatar, ListItemText, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, DialogContentText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { BlueButton, GrayButton } from '../../../../components/Button';
import { setCurrentUser } from '../../../../redux/features/userSlice';
import { toggleMode } from '../../../../redux/features/modeSlice';

export default function Footer() {
    const [openPopper, setOpenPopper] = useState(false);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickItem = () => {
        setOpenPopper(false);
        setOpenLogoutDialog(true);
    }

    const handleLogout = () => {
        localStorage.setItem('currentUser', null);
        dispatch(setCurrentUser(null));
        dispatch(toggleMode('light'));
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
                    <IconButton className='hidden lg:flex' onClick={() => setOpenLogoutDialog(true)}>
                        <LogoutIcon />
                    </IconButton>
                </ListItem>
            </Tippy>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={openLogoutDialog}
                onClose={() => setOpenLogoutDialog(false)}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: 2
                    }
                }}
            >
                <DialogTitle sx={{ p: 2, fontSize: '20px', fontWeight: 700 }}>
                    Xác nhận đăng xuất
                    <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8, }}
                        onClick={() => setOpenLogoutDialog(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ textAlign: 'center' }}>
                    <DialogContentText>Bạn có chắc muốn đăng xuất?</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: '10px' }}>
                    <GrayButton variant='contained' onClick={() => setOpenLogoutDialog(false)}>
                        Hủy bỏ
                    </GrayButton>
                    <BlueButton variant='contained' onClick={handleLogout}>Ok</BlueButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
