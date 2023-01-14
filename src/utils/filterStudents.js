import dayjs from "dayjs";

export default function filterStudents(filterInformation, studentList) {
    const inforKeyNotEmpty = Object.fromEntries(Object.entries(filterInformation).filter(([key, value]) => Boolean(value)));
    if (Object.keys(inforKeyNotEmpty).length === 0) {
        return {
            haveKeyFilter: false,
            filteredStudents: [],
        }
    }
    return {
        haveKeyFilter: true,
        filteredStudents: studentList.filter(student => {
            let isSatisfied = true;
            for (const key of Object.keys(inforKeyNotEmpty)) {
                if (key === 'dateOfBirth') {
                    if (dayjs(student[key]).format('DD/MM/YYYY') !== dayjs(inforKeyNotEmpty[key]).format('DD/MM/YYYY')) {
                        isSatisfied = false;
                    }
                }
                else {
                    if (!student[key].includes(inforKeyNotEmpty[key])) {
                        isSatisfied = false;
                    }
                }
            }
            return isSatisfied;
        })
    }
}