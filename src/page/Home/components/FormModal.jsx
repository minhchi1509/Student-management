import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close'
import * as Yup from 'yup';

import { GreenButton, PurpleButton } from '../../../common/Button';
import { Form, Formik, useField, useFormikContext } from 'formik';
import { FormInput, FormSelectRadio, DatePicker, FormSelectDropdown } from '../../../common/FormUI';
import { majorsList, provinces } from '../../../constants';
import { addNewStudent } from '../../../redux/features/studentSlice';
import { Notification } from '../../../common/Modal';

const INITIAL_FORM_STATE = {
    fullName: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    email: '',
    schoolYear: '',
    studentCode: '',
    majors: '',
}

const FORM_VALIDATION = Yup.object({
    fullName: Yup.string()
        .required('Vui lòng nhập đầy đủ họ tên'),
    gender: Yup.string()
        .required('Vui lòng chọn giới tính'),
    dateOfBirth: Yup.string()
        .required('Vui lòng chọn ngày sinh')
        .nullable(),
    address: Yup.string()
        .required('Vui lòng chọn địa chỉ'),
    email: Yup.string()
        .required('Vui lòng điền email')
        .email('Vui lòng nhập email hợp lệ'),
    schoolYear: Yup.string()
        .required('Vui lòng chọn khóa'),
    studentCode: Yup.string()
        .required('Vui lòng nhập mã sinh viên')
        .length(3, 'Mã sinh viên phải bao gồm 3 chữ số')
        .matches('[0-9]{3}', 'Mã sinh viên phải bao gồm 3 chữ số'),
    majors: Yup.string()
        .required('Vui lòng chọn ngành học'),
})

const getPrefixStudentCode = (schoolYear, majors) => {
    let acronymicMajors = '';
    switch (majors) {
        case 'Công nghệ thông tin':
            acronymicMajors = 'CN';
            break;
        case 'An toàn thông tin':
            acronymicMajors = 'AT';
            break;
        case 'Marketing':
            acronymicMajors = 'MR';
            break;
        case 'Quản trị kinh doanh':
            acronymicMajors = 'QT';
            break;
        case 'Kỹ thuật Điện tử viễn thông':
            acronymicMajors = 'VT';
            break;
        case 'Công nghệ đa phương tiện':
            acronymicMajors = 'PT';
            break;
        case 'Kế toán':
            acronymicMajors = 'KT';
            break;
        case 'Thương mại điện tử':
            acronymicMajors = 'TM';
            break;
        default:
            break;
    }
    return `B${schoolYear.slice(2)}DC${acronymicMajors}`;
}

const StudentCodeInput = () => {
    const { values: { schoolYear, majors }, touched } = useFormikContext();
    const [field, meta] = useField("studentCode");
    const [textAdorment, setTextAdorment] = useState('');

    useEffect(() => {
        if (schoolYear !== '' && majors !== '' && touched.schoolYear && touched.majors) {
            setTextAdorment(getPrefixStudentCode(schoolYear, majors));
        }
    }, [schoolYear, majors, touched.schoolYear, touched.majors])

    return (
        <TextField
            sx={{
                '& .MuiFormHelperText-root': {
                    marginLeft: '3px'
                },
            }}
            {...field}
            name='studentCode'
            size='small'
            fullWidth
            label='Mã sinh viên'
            InputProps={{
                startAdornment: <InputAdornment position='start'>{textAdorment}</InputAdornment>
            }}
            error={meta && meta.touched && meta.error}
            helperText={meta && meta.touched && meta.error ? meta.error : null}
        />
    )
}

export default function FormModal() {
    const [openDialog, setOpenDialog] = useState(false);
    const { loading } = useSelector(state => state.student);
    const notificationRef = useRef(null);
    const dispatch = useDispatch();

    const handleAddStudent = async (values) => {
        const newValues = {
            ...values,
            studentCode: getPrefixStudentCode(values.schoolYear, values.majors) + values.studentCode,
            uid: JSON.parse(localStorage.getItem('currentUser')),
        }
        await dispatch(addNewStudent(newValues));
        notificationRef.current.show();
    }

    return (
        <>
            <PurpleButton
                startIcon={<AddIcon />}
                fullWidth
                onClick={() => setOpenDialog(true)}
            >
                Thêm
            </PurpleButton>
            <Dialog
                open={openDialog}
                fullWidth
                maxWidth='sm'
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: 2,
                    },
                }}
            >
                <Formik
                    initialValues={INITIAL_FORM_STATE}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={(values) => handleAddStudent(values)}
                >
                    <Form>
                        <DialogTitle sx={{ p: 2, fontSize: '20px', fontWeight: 700 }}>
                            Thêm sinh viên
                            <IconButton
                                sx={{ position: 'absolute', top: 8, right: 8, }}
                                onClick={() => setOpenDialog(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormInput label="Họ và tên" name="fullName" size="small" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput label="Email" name="email" size="small" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormSelectRadio
                                        label="Giới tính"
                                        name="gender"
                                        direction='row'
                                        itemlist={["Nam", "Nữ", "Khác"]}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DatePicker label="Sinh nhật" name="dateOfBirth" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormSelectDropdown
                                        label='Địa chỉ'
                                        name='address'
                                        menuitemlist={provinces}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormSelectDropdown
                                        label='Khóa'
                                        name='schoolYear'
                                        menuitemlist={['2022', '2021', '2020', '2019', '2018']}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormSelectDropdown
                                        label='Ngành'
                                        name='majors'
                                        menuitemlist={majorsList}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StudentCodeInput />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
                            <GreenButton
                                type='submit'
                                variant='contained'
                                disabled={loading}
                                sx={{ width: '150px' }}
                            >
                                Thêm
                            </GreenButton>
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
            <Notification
                ref={notificationRef}
                title='Thêm mới thành công'
                content='Bạn đã thêm mới thành công sinh viên của mình'
                handleAction={() => {
                    notificationRef.current.close();
                    setOpenDialog(false);
                }}
            />
        </>
    )
}
