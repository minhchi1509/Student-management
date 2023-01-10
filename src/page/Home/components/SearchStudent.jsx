import React, { useRef } from 'react'
import { OutlinedInput, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import FormModal from './FormModal';

export default function SearchStudent() {
    const formModalRef = useRef(null);

    const handleSearchStudent = (values) => {
        console.log(values);
    }

    return (
        <>
            <OutlinedInput
                fullWidth
                size='small'
                className='rounded-full bg-grey-200 dark:bg-grey-900'
                placeholder='Tìm kiếm...'
                startAdornment={
                    <InputAdornment position='start'>
                        <SearchIcon />
                    </InputAdornment>
                }
                onClick={() => formModalRef.current.show()}
            />
            <FormModal
                ref={formModalRef}
                type='search'
                title='Tìm kiếm sinh viên'
                buttonName='Tìm kiếm'
                handleSubmit={handleSearchStudent}
            />
        </>
    )
}
