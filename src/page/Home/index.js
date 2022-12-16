import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../component/Sidebar'
import { setCurrentUser } from '../../redux/features/userSlice';

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('currentUser'));
        dispatch(setCurrentUser(id));
        if (!id)
            navigate('/login');
    }, [])

    return (
        <div className='container'>
            <div className='min-h-screen grid grid-cols-15'>
                <div className='z-10 col-span-2 lg:col-span-3 bg-white dark:bg-[#0A1929]'>
                    <Sidebar />
                </div>
                <div className='col-span-13 lg:col-span-12 pb-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
