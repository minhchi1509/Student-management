import React, { useState } from 'react'
import Logo from '../../assets/images/Logo.png'
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemAvatar, ListItemText, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import SidebarMenu from './SidebarMenu';
import DarkmodeToggle from './DarkmodeToggle';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { BlueButton, GrayButton } from '../Button';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../../redux/features/userSlice';
import { toggleMode } from '../../redux/features/modeSlice';

const Header = () => {
    return (
        <div className='flex items-center gap-3 mb-4'>
            <div className='flex-1 lg:flex-none'>
                <img alt='logo' src={Logo} className='w-10 h-10 lg:w-12 lg:h-12 mx-auto lg:mx-0 lg:scale-150' />
            </div>
            <Typography className='font-bold text-[30px] hidden lg:block'>Sun*</Typography>
        </div>
    )
}

const Body = () => {
    return (
        <>
            <SidebarMenu />
            <DarkmodeToggle />
        </>
    )
}

const Footer = () => {
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
                <ListItem alignItems='center' className='mt-5 justify-between px-0 sm:px-3'>
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
                        <Typography className='text-[20px] font-bold'>
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
                    <Typography>Bạn có chắc muốn đăng xuất?</Typography>
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
export default function Sidebar() {
    return (
        <div className='sticky top-5 left-0 px-2 lg:px-4'>
            <Header />
            <Body />
            <Footer />
        </div>
    )
}
