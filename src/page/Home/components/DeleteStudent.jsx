import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import { Confirmation, Loading } from 'common/Modal';
import { deleteStudent } from 'redux/features/studentSlice';

export default function DeleteStudent({ student }) {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.student);
    const confirmationRef = useRef(null);

    const handleDeleteStudent = async (student) => {
        dispatch(deleteStudent(student));
        confirmationRef.current.close();
    }

    return (
        <>
            <Tooltip title='Xóa' disableInteractive>
                <IconButton color='error' onClick={() => confirmationRef.current.show()}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Confirmation
                ref={confirmationRef}
                title='Xác nhận xóa sinh viên'
                content='Điều này sẽ xóa vĩnh viễn sinh viên khỏi danh sách. Bạn có chắc xóa?'
                handleAction={() => handleDeleteStudent(student)}
            />
            <Loading isOpen={loading} />
        </>
    )
}
