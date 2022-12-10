import { IconButton, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import DefaultAvt from '../../assets/images/defaultAvt.png';
import DatePicker from '../FormUI/DatePicker';
import FormInput from '../FormUI/FormInput';
import FormRadio from '../FormUI/FormRadio';
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { editUser, getAllUsers } from '../../redux/features/userSlice';

export default function EditProfile() {
    const avatarRef = useRef(null);
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const [avatarImgSrc, setAvatarImgSrc] = useState(currentUser?.avatarImage);
    const { isLoading } = useSelector(state => state.user);

    const INITIAL_FORM_EDIT = {
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        gender: currentUser?.gender,
        email: currentUser?.email,
        password: currentUser?.password,
        dateOfBirth: currentUser?.dateOfBirth,
    }

    const FORM_EDIT_VALIDATION = Yup.object({
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

    const handleChange = (event) => {
        const imageFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setAvatarImgSrc(reader.result);
        }
        imageFile && reader.readAsDataURL(imageFile);
    }

    const handleUpdate = async (values) => {
        const newInformation = {
            ...values,
            avatarImage: avatarImgSrc,
        }
        const id = currentUser?.id;
        await dispatch(editUser({
            id: id,
            information: newInformation
        }))
        await dispatch(getAllUsers());
    }

    return (
        <div className='p-5'>
            <Typography className='font-bold' variant='h4'>Chỉnh sửa trang cá nhân</Typography>

            {/* Edit image profile */}
            <div className='mt-10'>
                <Typography className='font-bold text-[20px]'>Ảnh đại diện</Typography>
                <div className='flex items-center gap-4 mt-3'>
                    <input type="file" onChange={handleChange} className='hidden' ref={avatarRef} />
                    <img src={avatarImgSrc || DefaultAvt} alt="" className='h-[120px] w-[120px] object-cover rounded-full' />
                    <div className='flex flex-col gap-3'>
                        <div
                            className='flex items-center justify-between h-10 p-2 gap-2 rounded-lg cursor-pointer bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700'
                            onClick={() => avatarRef.current.click()}
                        >
                            <IconButton disableRipple className='text-gray-100 p-0 z-0'>
                                <CameraAltIcon />
                            </IconButton>
                            <Typography className='text-[15px] text-gray-100'>Chọn ảnh</Typography>
                        </div>
                        <div
                            className='flex items-center gap-2 h-10 p-2 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
                            onClick={() => setAvatarImgSrc('')}
                        >
                            <IconButton disableRipple className='text-gray-100 p-0 z-0'>
                                <DeleteIcon />
                            </IconButton>
                            <Typography className='text-[15px] text-gray-100'>Xóa</Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit information */}
            <div className='pt-5'>
                <Typography className='font-bold text-[20px]'>Cập nhật thông tin của bạn</Typography>
                <Formik
                    initialValues={INITIAL_FORM_EDIT}
                    validationSchema={FORM_EDIT_VALIDATION}
                    onSubmit={(values) => handleUpdate(values)}
                >
                    <Form>
                        <Grid container spacing={2} className='max-w-3xl mt-1'>
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
                        <div className='flex gap-3 mt-5'>
                            <button
                                className='h-10 w-20 bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 rounded-lg'
                                type='reset'
                                onClick={() => setAvatarImgSrc('')}
                            >
                                Reset
                            </button>
                            <button className='h-10 w-28 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-opacity-50' type='submit' disabled={isLoading}>Cập nhật</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
