import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, styled, FormHelperText, Grid } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

const StyledRadio = styled(Radio)({
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
})

const StyledFormLabel = styled(FormLabel)({
    '&.Mui-focused': {
        color: '#606770',
    },
})

const StyledFormControlLabel = styled(FormControlLabel)({
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: '1px',
    borderRadius: '6px',
})

function FormSelectRadio(props) {
    const { direction, itemlist } = props;
    const [field, meta] = useField(props.name);

    const configRadioGroup = {
        ...field,
        ...props,
    }

    return (
        <FormControl fullWidth size='small' error={meta && meta.touched && meta.error}>
            <StyledFormLabel>{props.label}</StyledFormLabel>
            <RadioGroup {...configRadioGroup}>
                <Grid container spacing='12px' direction={direction}>
                    {itemlist?.map((item, index) => (
                        <Grid key={index} item xs>
                            <StyledFormControlLabel value={item} control={<StyledRadio />} label={item} />
                        </Grid>
                    ))}
                </Grid>
            </RadioGroup>
            {meta && meta.touched && meta.error &&
                <FormHelperText error sx={{ marginLeft: '3px' }}>{meta.error}</FormHelperText>
            }
        </FormControl>
    );
}

export default FormSelectRadio;