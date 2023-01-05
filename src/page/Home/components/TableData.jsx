import React from 'react'
import { Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';

const StyledTable = styled(Table)(({ theme }) => ({
    '& .MuiTableHead-root': {
        '& .MuiTableRow-root': {
            '& .MuiTableCell-root': {
                backgroundColor: theme.palette.mode === 'light' ? '#757575' : 'black',
                color: 'white',
            }
        }
    },
    '& .MuiTableBody-root': {
        '& .MuiTableRow-root': {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }
    },
}))

export default function TableData() {
    const { studentList } = useSelector(state => state.student);

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <StyledTable sx={{ minWidth: 1500 }} stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align='left'>Họ và tên</TableCell>
                        <TableCell align='left'>Ngày sinh</TableCell>
                        <TableCell align='left'>Giới tính</TableCell>
                        <TableCell align='left'>Địa chỉ</TableCell>
                        <TableCell align='left'>Email</TableCell>
                        <TableCell align='left'>Mã sinh viên</TableCell>
                        <TableCell align='left'>Khóa</TableCell>
                        <TableCell align='left'>Ngành</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList?.map((student, index) => (
                        <TableRow key={index}>
                            <TableCell align='left'>{index + 1}</TableCell>
                            <TableCell align='left'>{student.fullName}</TableCell>
                            <TableCell align='left'>
                                {dayjs(student.dateOfBirth).format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell align='left'>{student.gender}</TableCell>
                            <TableCell align='left'>{student.address}</TableCell>
                            <TableCell align='left'>{student.email}</TableCell>
                            <TableCell align='left'>{student.studentCode}</TableCell>
                            <TableCell align='left'>{student.schoolYear}</TableCell>
                            <TableCell align='left'>{student.majors}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </TableContainer>
    )
}
