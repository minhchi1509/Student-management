import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import { FormInput } from "../../common/FormUI";
import { BlueButton, GreenButton } from "../../common/Button";

const INITIAL_LOGIN_FORM = {
    email: '',
    password: '',
}

const LOGIN_FORM_VALIDATION = Yup.object({
    email: Yup.string()
        .required('Vui lòng điền email')
        .email('Vui lòng nhập email hợp lệ'),
    password: Yup.string()
        .required('Vui lòng nhập mật khẩu'),
});

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { allUsers } = useSelector(state => state.user);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('currentUser')))
            navigate('/');
    }, [])

    const handleLogin = (email, password) => {
        const targetUser = allUsers.find(user => user.email === email);
        if (!targetUser)
            return setErrorMessage('Email chưa từng được đăng ký tài khoản!');
        if (targetUser.password !== password)
            return setErrorMessage('Mật khẩu không đúng. Vui lòng nhập lại!');
        localStorage.setItem('currentUser', targetUser.id);
        navigate('/');
    }

    return (
        <Stack
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', paddingX: 2 }}
        >
            <Paper elevation={3} className='w-full max-w-sm rounded-xl p-4'>
                <Formik
                    initialValues={INITIAL_LOGIN_FORM}
                    validationSchema={LOGIN_FORM_VALIDATION}
                    onSubmit={(values) => handleLogin(values.email, values.password)}
                >
                    <Form>
                        <Stack
                            direction='column'
                            alignItems='center'
                            divider={<Divider orientation="horizontal" flexItem />}
                        >
                            <Box width='100%' height={64} >
                                <Typography fontSize='32px' fontWeight={700}>Đăng nhập</Typography>
                            </Box>
                            <Box paddingY={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormInput label="Email" name="email" size="small" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormInput type="password" label="Mật khẩu" name="password" size="small" />
                                    </Grid>
                                </Grid>
                                {errorMessage &&
                                    <Typography color='red' fontSize={14} textAlign='center' marginTop={1}>
                                        {errorMessage}
                                    </Typography>
                                }
                            </Box>
                            <Box paddingTop={2} width='100%'>
                                <Stack direction='column' alignItems='center' spacing={2}>
                                    <BlueButton type="submit" variant="contained" fullWidth>
                                        Đăng nhập
                                    </BlueButton>
                                    <GreenButton
                                        variant="contained"
                                        className="w-48"
                                        onClick={() => navigate('/signup')}
                                    >
                                        Đăng ký
                                    </GreenButton>
                                </Stack>
                            </Box>
                        </Stack>
                    </Form>
                </Formik>
            </Paper>
        </Stack>
    )
}