import { Box, Grid } from '@mui/material';
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
        <Box className='container'>
            <Grid container columns={15}>
                <Grid item xs={2} lg={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs>
                    <Outlet />
                </Grid>
            </Grid>
        </Box>
    )
}
