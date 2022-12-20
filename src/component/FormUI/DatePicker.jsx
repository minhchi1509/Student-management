import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useField, useFormikContext } from 'formik';

function DatePicker(props) {
    const [field, meta] = useField(props.name);
    const { setFieldValue } = useFormikContext();

    const styledProps = {
        '& .MuiOutlinedInput-root': {
            '&:hover:not(.Mui-focused, .Mui-error) fieldset': {
                borderColor: '#BCBDBE'
            },
        },
        '& .MuiFormHelperText-root': {
            marginLeft: '3px',
        },
        '& label': {
            color: 'gray'
        }
    }

    const configTextField = {
        ...props,
        sx: styledProps,
        size: "small",
        fullWidth: true,
        error: meta && meta.touched && meta.error,
        helperText: meta && meta.touched && meta.error ? meta.error : null,
    }

    const configDatePicker = {
        inputFormat: "DD/MM/YYYY",
        onChange: (newValue) => setFieldValue(props.name, newValue),
        value: field.value,
        renderInput: (params) => <TextField {...params} {...configTextField} />
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker {...configDatePicker} />
        </LocalizationProvider>
    );
}

export default DatePicker;