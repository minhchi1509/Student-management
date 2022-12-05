import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Grid } from '@mui/material';
import FormInput from '../../../component/FormUI/FormInput';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Notification from '../../../component/FormUI/Notification';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

export default function ForgotPassword() {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleResetPassword = async (email) => {
        try {
            setLoading(true);
            await resetPassword(email);
            setSuccess(true);
        } catch (error) {
            const err = error.code === 'auth/user-not-found' ? 'Email bạn đã nhập chưa từng được đăng ký tài khoản!' : '';
            setErrorMessage(err);
            setLoading(false);
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center fixed inset-0'>
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().required('Vui lòng nhập email').email('Vui lòng nhập email hợp lệ')
                    })}
                    onSubmit={(values) => handleResetPassword(values.email)}
                >
                    <Form>
                        <div className='w-full max-w-md bg-white rounded-2xl shadow-lg'>
                            {/* Header */}
                            <div className='h-14 border-b p-4'>
                                <p className='font-[600] text-[20px]'>Tìm tài khoản của bạn</p>
                            </div>

                            {/* Body */}
                            <div className='border-b p-4'>
                                <p className='text-[17px] font-[400] mb-4'>Vui lòng nhập email để tìm kiếm tài khoản của bạn.</p>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <FormInput label="Email" name="email" size="small" />
                                    </Grid>
                                </Grid>
                                <p className="text-red-500 text-sm font-[500] mt-2">{errorMessage}</p>
                            </div>

                            {/* Footer */}
                            <div className='flex items-center justify-end p-4'>
                                <button
                                    className='w-16 h-9 bg-gray-200 font-[700] text-[15px] text-[#4b4f56] rounded-md hover:bg-gray-300'
                                    onClick={() => navigate('/login')}
                                >
                                    Hủy
                                </button>
                                <button
                                    type='submit'
                                    className='w-24 h-9 ml-2 rounded-md bg-blue-500 hover:bg-blue-600 text-[white] font-[700] text-[15px] disabled:opacity-50'
                                    disabled={loading}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
            <Notification
                open={success}
                icon={<MarkEmailUnreadIcon />}
                head={'Thành công!'}
                details={'Vui lòng kiểm tra hòm thư email của bạn để đặt lại mật khẩu.'}
            />
        </>
    )
}
