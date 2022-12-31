import React from 'react';
import { Box, Grid } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setCurrentUser } from '../redux/features/userSlice';
import Sidebar from './Sidebar';

export default function PrivateLayout() {
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
