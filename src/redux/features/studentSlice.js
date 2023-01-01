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
    }
})

export default studentSlice.reducer;
export const { resetStudentList } = studentSlice.actions;