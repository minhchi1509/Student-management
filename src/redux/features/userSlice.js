import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_KEY}/users`);
    return data;
})

export const register = createAsyncThunk('user/register', async (value) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_KEY}/users`, value);
    return data;
})

export const editUser = createAsyncThunk('user/editUser', async (value) => {
    const { id, information } = value;
    const { data } = await axios.patch(`${process.env.REACT_APP_API_KEY}/users/${id}`, information);
    return data;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        loading: false,
        allUsers: [],
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload ? { ...state.allUsers.find(user => user.id === action.payload) } : {};
        }
    },
    extraReducers: (builder) => {
        builder
            //Get all users
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
            })
            //Register
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                console.log(action.payload.token);
                state.allUsers.push(action.payload);
                state.loading = false;
            })
            //Edit user
            .addCase(editUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.allUsers[action.payload.id - 1] = action.payload;
                state.loading = false;
            })
    }
});

export default userSlice.reducer;
export const { setCurrentUser } = userSlice.actions;