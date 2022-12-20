import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, styled, FormHelperText } from '@mui/material';
import { useFormikContext, useField } from 'formik';
import React from 'react';

const CustomRadio = styled(Radio)({
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
})

const CustomFormLabel = styled(FormLabel)({
    '&.Mui-focused': {
        color: '#606770',
    },
})

const cls = "w-full mx-auto border rounded-md";

function FormSelectRadio(props) {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props.name);
    const handleRadioChange = (event) => {
        setFieldValue(props.name, event.target.value);
    }
    const configRadioGroup = {
        ...field,
        ...props,
        onChange: handleRadioChange,
        value: field.value,
    }
    return (
        <FormControl fullWidth={true}>
            <CustomFormLabel error={meta && meta.touched && meta.error}>Giới tính</CustomFormLabel>
            <RadioGroup {...configRadioGroup} className='grid grid-cols-3 gap-3'>
                <FormControlLabel className={cls} value="female" control={<CustomRadio />} label="Nữ" />
                <FormControlLabel className={cls} value="male" control={<CustomRadio />} label="Nam" />
                <FormControlLabel className={cls} value="other" control={<CustomRadio />} label="Khác" />
            </RadioGroup>
            {meta && meta.touched && meta.error ?
                <FormHelperText error className='ml-[3px]'>{meta.error}</FormHelperText> :
                null}
        </FormControl>
    );
}

export default FormSelectRadio;