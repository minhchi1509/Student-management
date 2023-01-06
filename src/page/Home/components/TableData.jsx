import React, { useState } from 'react'
import { IconButton, Pagination, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';

import DeleteStudent from './DeleteStudent';

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
    const [page, setPage] = useState(1);
    const { studentList } = useSelector(state => state.student);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    return (
        <>
            <TableContainer component={Paper} sx={{
                maxHeight: 440,
                '::-webkit-scrollbar': {
                    height: '6px',
                },
                '::-webkit-scrollbar-thumb': {
                    backgroundColor: '#9e9e9e',
                    borderRadius: '9999px',
                }
            }}>
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
                            <TableCell align='left'>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentList
                            ?.slice((page - 1) * 5, page * 5)
                            ?.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell align='left'>{5 * (page - 1) + index + 1}</TableCell>
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
                                    <TableCell align='right' sx={{ p: 0 }}>
                                        <Stack direction='row'>
                                            <DeleteStudent student={student} />
                                            <IconButton color='secondary'>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
            <Stack direction='row' justifyContent='flex-end' marginTop={2}>
                <Pagination
                    count={Math.ceil(studentList.length / 5)}
                    page={page}
                    onChange={handlePageChange}
                    color='primary'
                />
            </Stack>
        </>
    )
}
