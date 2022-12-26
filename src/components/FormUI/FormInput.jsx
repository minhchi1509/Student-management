import { styled, TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFormHelperText-root': {
        marginLeft: '3px'
    },
    '& label': {
        color: theme.palette.mode === 'light' ? '#9e9e9e' : '#bdbdbd',
    }
}))

function FormInput(props) {
    const [field, meta] = useField(props.name);

    const configTextField = {
        ...field,
        ...props,
        size: 'small',
        fullWidth: true,
        error: meta && meta.touched && meta.error,
        helperText: meta && meta.touched && meta.error ? meta.error : null,
    }

    return (
        <StyledTextField {...configTextField} />
    );
}

export default FormInput;