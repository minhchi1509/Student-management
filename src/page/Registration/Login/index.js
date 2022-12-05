import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import FormInput from "../../../component/FormUI/FormInput";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

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
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            setLoading(true);
            await login(email, password);
            setLoading(false);
            navigate('/');

        } catch (error) {
            const err = error.code === 'auth/user-not-found' ? 'Email bạn đã nhập chưa từng được đăng ký tài khoản!' : 'Mật khẩu không đúng, vui lòng kiểm tra lại!';
            setErrorMessage(err);
            setLoading(false);
        }
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
                            <button type="submit" className="w-full h-12 rounded-md border-none bg-blue-500 hover:bg-blue-600 mt-4 text-white font-[700] text-[20px] duration-300 disabled:opacity-50" disabled={loading}>Đăng nhập</button>
                        </Form>
                    </Formik>
                    <Link to='/forgotpassword' className='mt-4 text-blue-500 font-[500] text-[14px] no-underline hover:underline mb-4'>Quên mật khẩu</Link>
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