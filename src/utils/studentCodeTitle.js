const getStudentCodeTitle = (schoolYear, majors) => {
    let acronymicMajors = '';
    switch (majors) {
        case 'Công nghệ thông tin':
            acronymicMajors = 'CN';
            break;
        case 'An toàn thông tin':
            acronymicMajors = 'AT';
            break;
        case 'Marketing':
            acronymicMajors = 'MR';
            break;
        case 'Quản trị kinh doanh':
            acronymicMajors = 'QT';
            break;
        case 'Kỹ thuật Điện tử viễn thông':
            acronymicMajors = 'VT';
            break;
        case 'Công nghệ đa phương tiện':
            acronymicMajors = 'PT';
            break;
        case 'Kế toán':
            acronymicMajors = 'KT';
            break;
        case 'Thương mại điện tử':
            acronymicMajors = 'TM';
            break;
        default:
            break;
    }
    return `B${schoolYear.slice(2)}DC${acronymicMajors}`;
}

export default getStudentCodeTitle;