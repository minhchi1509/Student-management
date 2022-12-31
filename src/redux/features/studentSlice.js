import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

    },
    extraReducers: (builder) => {
        builder
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
export const { } = studentSlice.actions;