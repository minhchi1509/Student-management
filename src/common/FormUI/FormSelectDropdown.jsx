import React from 'react'
import { FormControl, MenuItem, styled, TextField } from '@mui/material'
import { useField } from 'formik';

const StyledTextField = styled(TextField)({
    '& .MuiFormHelperText-root': {
        marginLeft: '3px'
    },
})

export default function FormSelectDropdown(props) {
    const { menuitemlist } = props;
    const [field, meta] = useField(props.name);

    const configTextField = {
        ...field,
        ...props,
        select: true,
        size: 'small',
        error: meta && meta.touched && meta.error,
        helperText: meta && meta.touched && meta.error ? meta.error : null,
    }

    return (
        <FormControl fullWidth size='small' error={meta && meta.touched && meta.error}>
            <StyledTextField {...configTextField}>
                {menuitemlist?.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
            </StyledTextField>
        </FormControl>
    )
}
