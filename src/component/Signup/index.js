import React, { useState } from 'react'
import { FormInput, DatePicker, FormSelectRadio } from '../FormUI';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Box, Divider, Paper, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/features/userSlice';
import { BlueButton, GreenButton } from '../Button';

const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    dateOfBirth: '',
};

const FORM_VALIDATION = Yup.object({
    firstName: Yup.string()
        .required('Vui lòng điền Họ'),
    lastName: Yup.string()
        .required('Vui lòng điền Tên'),
    email: Yup.string()
        .required('Vui lòng điền email')
        .email('Vui lòng nhập email hợp lệ'),
    password: Yup.string()
        .required('Vui lòng nhập mật khẩu')
        .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự'),
    dateOfBirth: Yup.string()
        .required('Vui lòng chọn ngày sinh'),
    gender: Yup.string()
        .required('Vui lòng chọn giới tính'),
});

export default function Signup() {
    const [signupSuccessfully, setSignupSuccessfully] = useState(false);
    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        await dispatch(register({
            ...values,
            avatarImage: '',
        }));
        setSignupSuccessfully(true);
    }

    return (
        <>
            <Stack
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{ minHeight: '100vh', paddingX: 2 }}
            >
                <Paper elevation={3} className='w-full max-w-lg rounded-xl p-4'>
                    <Formik
                        initialValues={INITIAL_FORM_STATE}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={(values) => handleRegister(values)}
                    >
                        <Form>
                            <Stack
                                direction='column'
                                alignItems='center'
                                divider={<Divider orientation="horizontal" flexItem />}
                            >
                                <Box width='100%' height='80px'>
                                    <Typography fontSize={32} fontWeight={700}>Đăng ký</Typography>
                                    <Typography fontSize={15} color='#606770'>
                                        Nhanh chóng và dễ dàng.
                                    </Typography>
                                </Box>
                                <Box paddingBottom={2}>
                                    <Grid container spacing={2} marginTop={0.5}>
                                        <Grid item xs={6}>
                                            <FormInput label="Họ" name="firstName" size="small" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormInput label="Tên" name="lastName" size="small" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormInput label="Email" name="email" size="small" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormInput label="Mật khẩu" name="password" size="small" type='password' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <DatePicker label="Sinh nhật" name="dateOfBirth" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormSelectRadio label="Giới tính" name="gender" />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box paddingTop={2}>
                                    <Stack direction='column' alignItems='center' gap={2}>
                                        <GreenButton
                                            type='submit'
                                            variant='contained'
                                            className='w-[200px]'
                                            disabled={loading}
                                        >
                                            Đăng ký
                                        </GreenButton>
                                        <Link
                                            to='/login'
                                            className='text-blue-500 text-[14px] no-underline hover:underline'
                                        >
                                            Bạn đã có tài khoản? Đăng nhập ngay
                                        </Link>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Form>
                    </Formik>
                </Paper>
            </Stack>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={signupSuccessfully}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: 2
                    }
                }}
            >
                <DialogTitle sx={{ fontSize: 25, fontWeight: 600 }}>Đăng ký thành công</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Đăng ký thành công, vui lòng sử dụng email và mật khẩu bạn vừa đăng ký để đăng nhập
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <BlueButton variant='contained' onClick={() => navigate('/login')}>Ok</BlueButton>
                </DialogActions>
            </Dialog>
        </>
    )
}