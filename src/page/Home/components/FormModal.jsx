import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import { Form, Formik, useField, useFormikContext } from 'formik'

import { GreenButton } from '../../../common/Button'
import { FormInput, FormSelectRadio, DatePicker, FormSelectDropdown } from '../../../common/FormUI'
import configs from '../../../configs'
import { getStudentCodeTitle } from '../../../utils'
import { majorsList, provinces } from '../../../constants'
import { Loading } from '../../../common/Modal'

const StudentCodeInput = () => {
    const { values: { schoolYear, majors } } = useFormikContext();
    const [field, meta] = useField("studentCode");
    const [textAdorment, setTextAdorment] = useState('');

    useEffect(() => {
        if (schoolYear !== '' && majors !== '') {
            setTextAdorment(getStudentCodeTitle(schoolYear, majors));
        }
    }, [schoolYear, majors])

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
    const { type, student, title, buttonName, handleSubmit } = props;
    const [open, setOpen] = useState(false);
    const { loading } = useSelector(state => state.student);
    const { INITIAL_FORM_STATE, FORM_VALIDATION } = configs.formInitialization(type, student);

    useImperativeHandle(ref, () => ({
        show: () => {
            setOpen(true);
        },
        close: () => {
            setOpen(false);
        }
    }));

    return (
        <>
            <Dialog
                open={open}
                fullWidth
                maxWidth='sm'
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: 2,
                        '::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '::-webkit-scrollbar-thumb': {
                            backgroundColor: '#9e9e9e',
                            borderRadius: '9999px',
                        }
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
                            {title}
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
                                sx={{ width: '150px' }}
                            >
                                {buttonName}
                            </GreenButton>
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
            <Loading isOpen={loading} />
        </>
    )
})

export default FormModal;