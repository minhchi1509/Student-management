import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs';
import axios from "axios";

export const getStudentList = createAsyncThunk('student/getStudentList', async (value) => {
    const { userId } = value;
    const { data } = await axios.get(`http://localhost:5000/students?uid=${userId}`);
    return data;
})

export const addNewStudent = createAsyncThunk('student/addNewStudent', async (value) => {
    const { data } = await axios.post('http://localhost:5000/students', value)
    return data;
})

export const deleteStudent = createAsyncThunk('student/deleteStudent', async (value) => {
    const { uid, id } = value;
    await axios.delete(`http://localhost:5000/students/${id}`);
    const { data } = await axios.get(`http://localhost:5000/students?uid=${uid}`);
    return data;
})

export const editStudent = createAsyncThunk('student/editStudent', async (value) => {
    const { id, uid } = value;
    await axios.patch(`http://localhost:5000/students/${id}`, value);
    const { data } = await axios.get(`http://localhost:5000/students?uid=${uid}`);
    return data;
})

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        loading: false,
        studentList: [],
        isFiltered: false,
        filteredStudentList: [],
    },
    reducers: {
        resetStudentList: (state) => {
            state.studentList = [];
        },
        filterStudentList: (state, action) => {
            const searchInformation = Object.fromEntries(Object.entries(action.payload).filter(([key, value]) => Boolean(value)));
            if (Object.keys(searchInformation).length > 0) {
                state.isFiltered = true;
                state.filteredStudentList = state.studentList.filter(student => {
                    let isSatisfied = true;
                    for (const key of Object.keys(searchInformation)) {
                        if (key === 'dateOfBirth') {
                            if (dayjs(student[key]).format('DD/MM/YYYY') !== dayjs(searchInformation[key]).format('DD/MM/YYYY')) {
                                isSatisfied = false;
                            }
                        }
                        else {
                            if (!student[key].includes(searchInformation[key])) {
                                isSatisfied = false;
                            }
                        }
                    }
                    return isSatisfied;
                })
            }
        },
        clearSearch: (state) => {
            state.isFiltered = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudentList.fulfilled, (state, action) => {
                state.studentList = action.payload;
            })
            //Add new student
            .addCase(addNewStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(addNewStudent.fulfilled, (state, action) => {
                state.studentList.push(action.payload);
                state.loading = false;
            })
            //Delete student
            .addCase(deleteStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.studentList = action.payload;
                state.loading = false;
            })
            //Edit student
            .addCase(editStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(editStudent.fulfilled, (state, action) => {
                state.studentList = action.payload;
                state.loading = false;
            })
    }
})

export default studentSlice.reducer;
export const { resetStudentList, filterStudentList, clearSearch } = studentSlice.actions;