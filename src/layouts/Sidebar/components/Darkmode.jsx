import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, styled, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';

import { toggleMode } from '../../../redux/features/modeSlice';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        '&.Mui-selected': {
            color: theme.palette.mode === 'light' ? 'rgb(0, 127, 255)' : 'white',
            borderColor: 'rgb(0, 127, 255)'
        },
        borderRadius: '10px',
        borderColor: theme.palette.mode === 'dark' ? 'rgb(30, 73, 118)' : 'rgb(224, 227, 231)'
    }
}));

export default function Darkmode() {
    const currentMode = useSelector(state => state.mode.currentMode);
    const [mode, setMode] = useState(currentMode);
    const dispatch = useDispatch();

    const handleChangeMode = (event, newMode) => {
        if (newMode !== null) {
            setMode(newMode);
            dispatch(toggleMode(newMode));
        }
    }

    const handleToggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        dispatch(toggleMode(newMode));
    }

    return (
        <>
            <Tooltip title={mode === 'light' ? 'Turn off the light' : 'Turn on the light'}>
                <Button
                    variant='outlined'
                    color='primary'
                    className='block lg:hidden mx-auto min-w-0 w-full max-w-[48px] p-1'
                    onClick={handleToggleMode}
                >
                    {mode === 'light' ? <NightlightOutlinedIcon className='scale-75' /> : <WbSunnyOutlinedIcon className='scale-75' />}
                </Button>
            </Tooltip>
            <StyledToggleButtonGroup
                fullWidth={true}
                color='primary'
                value={mode}
                exclusive
                onChange={handleChangeMode}
                className='hidden lg:flex'
            >
                <ToggleButton value='light' className='gap-2'>
                    <WbSunnyOutlinedIcon />
                    <p className='hidden xl:block normal-case'>Light</p>
                </ToggleButton>
                <ToggleButton value='dark' className='gap-2'>
                    <NightlightOutlinedIcon />
                    <p className='hidden xl:block normal-case'>Dark</p>
                </ToggleButton>
            </StyledToggleButtonGroup>
        </>
    )
}
