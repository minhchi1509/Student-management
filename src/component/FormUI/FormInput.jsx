import { styled, TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&:hover:not(.Mui-focused, .Mui-error) fieldset': {
            borderColor: '#BCBDBE'
        }
    },
    '& .MuiFormHelperText-root': {
        marginLeft: '3px'
    },
    '& label': {
        color: 'gray'
    }
})

function FormInput(props) {
    const [field, meta] = useField(props.name);

    const configTextField = {
        ...field,
        ...props,
        fullWidth: true,
        error: meta && meta.touched && meta.error,
        helperText: meta && meta.touched && meta.error ? meta.error : null,
    }

    return (
        <CustomTextField {...configTextField} />
    );
}

export default FormInput;