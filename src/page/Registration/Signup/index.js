import React, { useState } from 'react'
import DatePicker from "../../../component/FormUI/DatePicker";
import FormInput from "../../../component/FormUI/FormInput";
import FormRadio from "../../../component/FormUI/FormRadio";
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/features/userSlice';
import dayjs from 'dayjs';
import Notification from '../../../component/FormUI/Notification';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
        .required('Vui lòng điền tên'),
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
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const dispatch = useDispatch();

    const handleRegister = async (values) => {
        try {
            setLoading(true);
            await signUp(values.email, values.password);
            dispatch(register({
                ...values,
                dateOfBirth: dayjs(values.dateOfBirth).format('DD/MM/YYYY')
            }));
            setSuccess(true);
        } catch (error) {

        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center fixed inset-0'>
                <div className='flex flex-col items-center w-full max-w-lg rounded-xl bg-white p-4 shadow-md'>
                    {/* Header */}
                    <div className="w-full h-20 border-b">
                        <p className="font-[700] text-[32px] text-[#1c1e21]">Đăng ký</p>
                        <p className="font-[400] text-[15px] text-[#606770]">Nhanh chóng và dễ dàng.</p>
                    </div>

                    {/* Body */}
                    <Formik
                        initialValues={INITIAL_FORM_STATE}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={(values) => handleRegister(values)}
                    >
                        <Form>
                            <Grid container spacing={2} className='mt-1'>
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
                                    <FormRadio label="Giới tính" name="gender" />
                                </Grid>
                            </Grid>
                            <div className='flex flex-col items-center mt-5'>
                                <button
                                    type='submit'
                                    className='h-9 w-[194px] rounded-md text-white font-[700] text-sm cursor-pointer bg-green-500 hover:bg-green-600 duration-300 disabled:opacity-50'
                                    disabled={loading}
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </Form>
                    </Formik>

                    {/* Footer */}
                    <Link to='/login' className='mt-4 text-blue-500 font-[500] text-[14px] no-underline hover:underline'>Bạn đã có tài khoản? Đăng nhập ngay</Link>
                </div>
            </div>
            <Notification
                open={success}
                icon={<CheckCircleOutlineIcon />}
                head={'Đăng ký thành công!'}
                details={'Vui lòng đăng nhập để tiếp tục.'}
            />
        </>
    )
}