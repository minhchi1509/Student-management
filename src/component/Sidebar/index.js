import React from 'react'
import Logo from '../../assets/images/Logo.png'
import { Avatar, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { menuList } from './menuList';
import SidebarMenu from '../SidebarMenu';
import DarkmodeToggle from '../DarkmodeToggle';
import Confirmation from '../Confirmation';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '../../redux/features/modeSlice';
import { setCurrentUser } from '../../redux/features/userSlice';

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
        </>
    )
}

const Footer = () => {
    const logoutConfirmRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    const handleLogout = async () => {
        localStorage.setItem('currentUser', null);
        await dispatch(setCurrentUser(null));
        dispatch(toggleMode('light'));
        navigate('/login');
    }

    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='w-full flex items-center gap-3 mt-10'>
                    <div className='flex-1 xl:flex-none'>
                        <Avatar className='bg-gray-400 w-11 h-11 mx-auto xl:mx-0 scale-75 md:scale-100'>{currentUser?.lastName?.[0]}</Avatar>
                    </div>
                    <div className='hidden xl:flex flex-1 items-center justify-between'>
                        <div className='leading-[20px]'>
                            <p>Welcome,</p>
                            <Typography className='font-bold text-[20px]'>{currentUser?.lastName}</Typography>
                        </div>
                        <IconButton
                            className='p-0'
                            onClick={() => logoutConfirmRef.current.openConfirm()}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <Confirmation
                ref={logoutConfirmRef}
                title='Xác nhận đăng xuất'
                details='Bạn có chắc muốn đăng xuất?'
                handleConfirm={handleLogout}
            />
        </>
    )
}
export default function Sidebar() {
    return (
        <div className='sticky top-5 w-full px-2 lg:px-4'>
            <Header />
            <Body />
            <Footer />
        </div>
    )
}
