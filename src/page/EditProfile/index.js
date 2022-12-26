import React, { useState, useRef } from 'react'
import { Avatar, Box, Stack, Grid, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import DefaultAvt from '../../assets/images/defaultAvt.png';
import { FormInput, DatePicker, FormSelectRadio } from '../../components/FormUI';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { editUser, getAllUsers } from '../../redux/features/userSlice';
import { BlueButton, GrayButton, PurpleButton, RedButton } from '../../components/Button';
import { NotificationModal } from '../../components/shared';

export default function EditProfile() {
    const notificationRef = useRef(null);
    const dispatch = useDispatch();
    const { currentUser, loading } = useSelector(state => state.user);
    const [avatarImgSrc, setAvatarImgSrc] = useState(currentUser?.avatarImage);

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
            .required('Vui lòng chọn ngày sinh')
            .nullable(),
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
        notificationRef.current.show();
    }

    return (
        <Box padding={3}>
            <Typography fontWeight='bold' variant='h4'>Chỉnh sửa trang cá nhân</Typography>
            <Box marginTop={5}>
                <Typography fontSize={20} fontWeight={700}>Ảnh đại diện</Typography>
                <Stack
                    marginTop={2}
                    direction='row'
                    alignItems='center'
                    spacing={2}
                >
                    <Avatar
                        src={avatarImgSrc || DefaultAvt}
                        alt='Avatar'
                        className='w-[120px] h-[120px]'
                    />
                    <Stack
                        direction='column'
                        spacing={1}
                    >
                        <PurpleButton
                            component="label"
                            variant='contained'
                            startIcon={<CameraAltIcon />}
                        >
                            Chọn ảnh
                            <input hidden accept="image/*" type="file" onChange={handleChange} />
                        </PurpleButton>
                        <RedButton
                            variant='contained'
                            startIcon={<DeleteIcon />}
                            onClick={() => setAvatarImgSrc('')}
                        >
                            Xóa
                        </RedButton>
                    </Stack>
                </Stack>
            </Box>
            <Box marginTop={2}>
                <Typography fontSize={20} fontWeight={700}>Cập nhật thông tin của bạn</Typography>
                <Formik
                    initialValues={INITIAL_FORM_EDIT}
                    validationSchema={FORM_EDIT_VALIDATION}
                    onSubmit={(values) => handleUpdate(values)}
                >
                    <Form>
                        <Grid container spacing={2} maxWidth={768} marginTop={0.5}>
                            <Grid item xs={6}>
                                <FormInput label="Họ" name="firstName" />
                            </Grid>
                            <Grid item xs={6}>
                                <FormInput label="Tên" name="lastName" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput label="Email" name="email" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput label="Mật khẩu" name="password" type='password' />
                            </Grid>
                            <Grid item xs={12}>
                                <DatePicker label="Sinh nhật" name="dateOfBirth" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormSelectRadio
                                    label="Giới tính"
                                    name="gender"
                                    direction='row'
                                    itemList={["Nam", "Nữ", "Khác"]}
                                />
                            </Grid>
                        </Grid>
                        <Stack
                            direction='row'
                            spacing={2}
                            marginTop={2}
                        >
                            <GrayButton
                                type='reset'
                                variant='contained'
                                onClick={() => setAvatarImgSrc(currentUser?.avatarImage)}
                            >
                                Reset
                            </GrayButton>
                            <BlueButton type='submit' variant='contained' disabled={loading}>
                                Cập nhật
                            </BlueButton>
                        </Stack>
                    </Form>
                </Formik>
            </Box>
            <NotificationModal
                ref={notificationRef}
                title='Cập nhật thành công'
                content='Bạn đã chỉnh sửa thành công trang cá nhân của mình'
                handleAction={() => notificationRef.current.close()}
            />
        </Box>
    )
}
