import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Sidebar from './Sidebar';
import { setCurrentUser } from '../redux/features/userSlice';
import { getStudentList } from '../redux/features/studentSlice';

export default function PrivateLayout() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAllStudents = async (id) => {
        setLoading(true);
        await dispatch(getStudentList({ userId: id }));
        setLoading(false);
    }

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('currentUser'));
        dispatch(setCurrentUser(id));
        if (!id)
            navigate('/login');
        else
            getAllStudents(id);
    }, [])

    return (
        !loading ? (
            <Box className='container'>
                <Grid container columns={15}>
                    <Grid item xs={2} lg={3}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={13} lg={12}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Box>
        ) : null
    )
}
