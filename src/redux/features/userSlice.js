import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        fullName: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        password: '',
    },
    reducers: {
        register: (state, action) => {
            const data = action.payload;
            state.fullName = data.firstName.trim() + " " + data.lastName.trim();
            state.dateOfBirth = data.dateOfBirth;
            state.gender = data.gender;
            state.email = data.email;
            state.password = data.password;
        }
    }
});
export const { register } = userSlice.actions;
export default userSlice.reducer;