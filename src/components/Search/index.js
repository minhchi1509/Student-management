import React from 'react'
import { OutlinedInput, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
    return (
        <OutlinedInput
            className='h-10 rounded-full bg-grey-200 dark:bg-grey-900'
            placeholder='Tìm kiếm...'
            startAdornment={
                <InputAdornment position='start'>
                    <SearchIcon />
                </InputAdornment>
            }
            fullWidth
        />
    )
}
