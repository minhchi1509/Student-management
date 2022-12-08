import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { forwardRef, useState, useImperativeHandle } from 'react'
import Modal from '../Modal';
const Confirmation = forwardRef(({ title, details, handleConfirm }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openConfirm: () => {
            setOpen(true);
        },
        closeConfirm: () => {
            setOpen(false);
        }
    }));

    return (
        <Modal
            open={open}
            className='container max-w-xs bg-white dark:bg-[#242526] rounded-md'
        >
            {/* Header */}
            <div className='flex items-center justify-around h-[60px] border-b p-3'>
                <Typography className='font-bold text-[20px]'>{title}</Typography>
                <IconButton
                    className='absolute top-3 right-3'
                    onClick={() => setOpen(false)}
                    size='small'
                >
                    <CloseIcon />
                </IconButton>
            </div>

            <div className='my-6'>
                <Typography className='font-medium text-[15px] text-center text-gray-600 dark:text-gray-200'>{details}</Typography>
            </div>

            <div className='flex items-center justify-around gap-2 p-5'>
                <button
                    className='h-10 w-28 rounded-md bg-gray-200 hover:bg-gray-300 text-[#4b4f56] dark:text-slate-800 dark:bg-gray-400 dark:hover:bg-gray-500'
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </button>
                <button
                    className='h-10 w-28 rounded-md bg-blue-500 hover:bg-blue-600 text-white'
                    onClick={handleConfirm}
                >
                    Ok
                </button>
            </div>
        </Modal>
    )
})

export default Confirmation