import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import Login from "./page/Registration/Login";
import Signup from "./page/Registration/Signup";
import ForgotPassword from "./page/Registration/ForgotPassword";
import Home from "./page/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from "react-redux";

function App() {
  const currentMode = useSelector(state => state.mode.currentMode);
  const theme = createTheme({
    palette: {
      mode: currentMode,
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`${currentMode}`}>
        <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#1A2027]">
          <BrowserRouter>
            <AuthContextProvider>
              <Routes>
                <Route element={<Login />} path='/login' />
                <Route element={<Signup />} path='/signup' />
                <Route element={<ForgotPassword />} path='/forgotpassword' />
                <Route element={<Home />} path='/'>
                  <Route element={<></>} path='/setting/*' />
                  <Route element={<></>} path='/support' />
                  <Route element={<></>} path='/report' />
                </Route>
              </Routes>
            </AuthContextProvider>
          </BrowserRouter>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
