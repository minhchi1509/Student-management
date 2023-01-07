import * as Yup from 'yup';

const formInitialization = (type, obj) => {
    const INITIAL_FORM_STATE = type === 'edit' ?
        {
            fullName: obj.fullName,
            gender: obj.gender,
            dateOfBirth: obj.dateOfBirth,
            address: obj.address,
            email: obj.email,
            schoolYear: obj.schoolYear,
            studentCode: obj.studentCode.slice(7),
            majors: obj.majors,
            uid: obj.uid,
            id: obj.id,
        } :
        {
            fullName: '',
            gender: '',
            dateOfBirth: '',
            address: '',
            email: '',
            schoolYear: '',
            studentCode: '',
            majors: '',
        };

    const FORM_VALIDATION = Yup.object({
        fullName: Yup.string()
            .required('Vui lòng nhập đầy đủ họ tên'),
        gender: Yup.string()
            .required('Vui lòng chọn giới tính'),
        dateOfBirth: Yup.string()
            .required('Vui lòng chọn ngày sinh')
            .nullable(),
        address: Yup.string()
            .required('Vui lòng chọn địa chỉ'),
        email: Yup.string()
            .required('Vui lòng điền email')
            .email('Vui lòng nhập email hợp lệ'),
        schoolYear: Yup.string()
            .required('Vui lòng chọn khóa'),
        studentCode: Yup.string()
            .required('Vui lòng nhập mã sinh viên')
            .length(3, 'Mã sinh viên phải bao gồm 3 chữ số')
            .matches('[0-9]{3}', 'Mã sinh viên phải bao gồm 3 chữ số'),
        majors: Yup.string()
            .required('Vui lòng chọn ngành học'),
    })
    return { INITIAL_FORM_STATE, FORM_VALIDATION };
}

export default formInitialization;