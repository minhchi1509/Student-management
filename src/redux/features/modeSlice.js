import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
    name: 'mode',
    initialState: {
        currentMode: 'light',
    },
    reducers: {
        toggleMode: (state, action) => {
            state.currentMode = action.payload;
        }
    }
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;