import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close'
import * as Yup from 'yup';

import { PurpleButton } from '../../../common/Button';
import { Form, Formik, useFormikContext } from 'formik';
import { FormInput, FormSelectRadio, DatePicker, FormSelectDropdown } from '../../../common/FormUI';
import { majorsList, provinces } from '../../../constants';

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
        .matches('[0-9]{3}', 'Mã sinh viên bao gồm 3 chữ số'),
    majors: Yup.string()
        .required('Vui lòng chọn ngành học'),
})

export default function AddStudent() {
    const [openDialog, setOpenDialog] = useState(false);

    const handleAddStudent = (values) => {
        console.log(values);
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
                maxWidth='xs'
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
                            </Grid>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </>
    )
}
