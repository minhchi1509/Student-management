import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import FormInput from "../../../component/FormUI/FormInput";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
        <div className="flex flex-col justify-center items-center fixed inset-0">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-4">
                {/* Header */}
                <div className="h-16 border-b w-full">
                    <p className="font-[700] text-[32px] text-[#1c1e21]">Đăng nhập</p>
                </div>

                {/* Body */}
                <div className="flex flex-col items-center border-b">
                    <Formik
                        initialValues={INITIAL_LOGIN_FORM}
                        validationSchema={LOGIN_FORM_VALIDATION}
                        onSubmit={(values) => handleLogin(values.email, values.password)}
                    >
                        <Form>
                            <Grid className="mt-1" container spacing={2}>
                                <Grid item xs={12}>
                                    <FormInput label="Email" name="email" size="small" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput type="password" label="Mật khẩu" name="password" size="small" />
                                </Grid>
                            </Grid>
                            <p className="text-center text-red-500 text-sm font-[500] mt-2">{errorMessage}</p>
                            <button type="submit" className="w-full h-12 rounded-md border-none bg-blue-500 hover:bg-blue-600 mt-4 text-white font-[700] text-[20px] duration-300 disabled:opacity-50">Đăng nhập</button>
                        </Form>
                    </Formik>
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center mt-5">
                    <button
                        type="button"
                        className='h-9 w-48 rounded-md text-white font-[700] text-sm cursor-pointer bg-green-500 hover:bg-green-600 duration-300'
                        onClick={() => navigate('/signup')}
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    )
}