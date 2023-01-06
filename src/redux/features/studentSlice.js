import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        loading: false,
        studentList: [],
    },
    reducers: {
        resetStudentList: (state) => {
            state.studentList = [];
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
    }
})

export default studentSlice.reducer;
export const { resetStudentList } = studentSlice.actions;