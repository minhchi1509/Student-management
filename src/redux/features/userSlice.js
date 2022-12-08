import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    const response = await fetch('http://localhost:5000/users');
    const data = await response.json();
    return data;
})

export const register = createAsyncThunk('user/register', async (value) => {
    const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    })
    const data = await response.json();
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
    }
});
export default userSlice.reducer;
export const { setCurrentUser } = userSlice.actions;