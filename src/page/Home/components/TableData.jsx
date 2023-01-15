import React, { useState } from 'react'
import { Pagination, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs';

import DeleteStudent from './DeleteStudent';
import EditStudent from './EditStudent';
import { RedButton } from 'common/Button';
import { clearSearch } from 'redux/features/studentSlice';
import configs from 'configs';

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
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { studentList, isFiltered, filteredStudentList } = useSelector(state => state.student);
    const renderedList = isFiltered ? filteredStudentList : studentList;

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
                            {configs.headTableColumns.map(column =>
                                <TableCell align='left'>{column.label}</TableCell>)
                            }
                            <TableCell align='left'>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderedList
                            ?.slice((page - 1) * 5, page * 5)
                            ?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell align='left'>{5 * (page - 1) + index + 1}</TableCell>
                                    {
                                        configs.headTableColumns.map(column =>
                                            <TableCell align='left'>{column.name === 'dateOfBirth' ? dayjs(item[column.name]).format('DD/MM/YYYY') : item[column.name]}</TableCell>
                                        )
                                    }
                                    <TableCell align='right' sx={{ p: 0 }}>
                                        <Stack direction='row'>
                                            <DeleteStudent student={item} />
                                            <EditStudent student={item} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
            <Stack direction='row' justifyContent='flex-end' marginTop={2} spacing={2}>
                <RedButton
                    size='small'
                    className='p-2'
                    onClick={() => dispatch(clearSearch())}
                >
                    Tắt chế độ tìm kiếm
                </RedButton>
                <Pagination
                    count={Math.ceil(renderedList.length / 5)}
                    page={page}
                    onChange={handlePageChange}
                    color='primary'
                />
            </Stack>
        </>
    )
}
