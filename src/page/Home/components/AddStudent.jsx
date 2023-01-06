import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

import { PurpleButton } from '../../../common/Button';
import { addNewStudent } from '../../../redux/features/studentSlice';
import { getStudentCodeTitle } from '../../../utils';
import FormModal from './FormModal';



export default function AddStudent() {
    const formModalRef = useRef(null);
    const dispatch = useDispatch();

    const handleAddStudent = async (values) => {
        const newValues = {
            ...values,
            studentCode: getStudentCodeTitle(values.schoolYear, values.majors) + values.studentCode,
            uid: JSON.parse(localStorage.getItem('currentUser')),
        }
        await dispatch(addNewStudent(newValues));
        formModalRef.current.close();
    }

    return (
        <>
            <PurpleButton
                startIcon={<AddIcon />}
                fullWidth
                onClick={() => formModalRef.current.show()}
            >
                Thêm
            </PurpleButton>
            <FormModal
                ref={formModalRef}
                type='add'
                title='Thêm sinh viên'
                buttonName='Thêm'
                handleSubmit={handleAddStudent}
            />
        </>
    )
}
