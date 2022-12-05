import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import modeReducer from './features/modeSlice';

const rootSlice = {
    user: userReducer,
    mode: modeReducer,
}

const store = configureStore({
    reducer: rootSlice,
});

export default store;