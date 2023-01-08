import React, { useRef } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch } from 'react-redux';

import FormModal from './FormModal';
import { getStudentCodeTitle } from '../../../utils';
import { editStudent } from '../../../redux/features/studentSlice';


export default function EditStudent({ student }) {
    const formModalRef = useRef(null);
    const dispatch = useDispatch();

    const handleUpdateStudent = async (values) => {
        const newValues = {
            ...values,
            studentCode: getStudentCodeTitle(values.schoolYear, values.majors) + values.studentCode,
        }
        await dispatch(editStudent(newValues));
        formModalRef.current.close();
    }

    return (
        <>
            <Tooltip title='Chỉnh sửa' disableInteractive>
                <IconButton color='secondary' onClick={() => formModalRef.current.show()}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <FormModal
                ref={formModalRef}
                type='search'
                title='Chỉnh sửa thông tin sinh viên'
                buttonName='Cập nhật'
                student={student}
                handleSubmit={handleUpdateStudent}
            />
        </>

    )
}
