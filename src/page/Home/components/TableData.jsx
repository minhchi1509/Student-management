import React from 'react'
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export default function TableData() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '1000px' }}>
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
            </Table>
        </TableContainer>
    )
}
