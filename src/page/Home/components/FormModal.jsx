import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import { Form, Formik, useField, useFormikContext } from 'formik'

import { GreenButton } from '../../../common/Button'
import { FormInput, FormSelectRadio, DatePicker, FormSelectDropdown } from '../../../common/FormUI'
import { formModalConfigs } from '../../../configs'
import { getStudentCodeTitle } from '../../../utils'
import { majorsList, provinces } from '../../../constants'

const StudentCodeInput = () => {
    const { values: { schoolYear, majors }, touched } = useFormikContext();
    const [field, meta] = useField("studentCode");
    const [textAdorment, setTextAdorment] = useState('');

    useEffect(() => {
        if (schoolYear !== '' && majors !== '' && touched.schoolYear && touched.majors) {
            setTextAdorment(getStudentCodeTitle(schoolYear, majors));
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

const FormModal = forwardRef((props, ref) => {
    const { type, student, handleSubmit } = props;
    const [open, setOpen] = useState(false);
    const { loading } = useSelector(state => state.student);
    const { INITIAL_FORM_STATE, FORM_VALIDATION } = formModalConfigs(type, student);

    useImperativeHandle(ref, () => ({
        show: () => {
            setOpen(true);
        },
        close: () => {
            setOpen(false);
        }
    }));

    return (
        <Dialog
            open={open}
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
                onSubmit={(values) => handleSubmit(values)}
            >
                <Form>
                    <DialogTitle sx={{ p: 2, fontSize: '20px', fontWeight: 700 }}>
                        {type === 'update' ? 'Chỉnh sửa thông tin sinh viên' : (type === 'add' ? 'Thêm sinh viên' : 'Tìm kiếm sinh viên')}
                        <IconButton
                            sx={{ position: 'absolute', top: 8, right: 8, }}
                            onClick={() => setOpen(false)}
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
                            {type === 'update' ? 'Cập nhật' : (type === 'add' ? 'Thêm' : 'Tìm kiếm')}
                        </GreenButton>
                    </DialogActions>
                </Form>
            </Formik>
        </Dialog>
    )
})

export default FormModal;