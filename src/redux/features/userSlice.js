import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    const { data } = await axios.get('http://localhost:5000/users');
    return data;
})

export const register = createAsyncThunk('user/register', async (value) => {
    const { data } = await axios.post('http://localhost:5000/users', value)
    return data;
})

export const editUser = createAsyncThunk('user/editUser', async (value) => {
    const { data } = await axios.patch(`http://localhost:5000/users/${value.id}`, value.information);
    return data;
})

export const userSlice = createSlice({
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
    extraReducers: {
        //Get all users
        [getAllUsers.fulfilled]: (state, action) => {
            state.allUsers = [...action.payload]
        },

        //Register
        [register.pending]: (state) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.allUsers.push(action.payload);
            state.loading = false;
        },

        //Edit user
        [editUser.pending]: (state) => {
            state.loading = true;
        },
        [editUser.fulfilled]: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        }
    }
});
export default userSlice.reducer;
export const { setCurrentUser } = userSlice.actions;