import React, { useRef } from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import { Confirmation, Loading } from '../../../common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent } from '../../../redux/features/studentSlice';

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
            <IconButton color='error' onClick={() => confirmationRef.current.show()}>
                <DeleteIcon />
            </IconButton>
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
