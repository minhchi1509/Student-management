import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import modeReducer from "./features/modeSlice";
import studentReducer from "./features/studentSlice";

const rootSlice = {
  user: userReducer,
  mode: modeReducer,
  student: studentReducer,
};

const store = configureStore({
  reducer: rootSlice,
});

export default store;
