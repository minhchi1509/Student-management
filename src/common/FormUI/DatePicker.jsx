import React from 'react';
import { styled, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useField, useFormikContext } from 'formik';

const StyledTextField = styled(TextField)({
    '& .MuiFormHelperText-root': {
        marginLeft: '3px'
    },
})

export default function DatePicker(props) {
    const [field, meta] = useField(props.name);
    const { setFieldValue } = useFormikContext();

    const configTextField = {
        ...field,
        ...props,
        size: "small",
        fullWidth: true,
        error: meta && meta.touched && meta.error,
        helperText: meta && meta.touched && meta.error ? meta.error : null,
    }

    const configDatePicker = {
        inputFormat: "DD/MM/YYYY",
        maxDate: new Date(),
        onChange: (newValue) => setFieldValue(props.name, newValue),
        value: field.value,
        renderInput: (params) => <StyledTextField {...params} {...configTextField} />
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker {...configDatePicker} />
        </LocalizationProvider>
    );
}