import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Registration/Login";
import Signup from "./page/Registration/Signup";
import Home from "./page/Home";
import EditProfile from "./component/EditProfile";
import { createTheme, Dialog, ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "./redux/features/userSlice";

function App() {
  const [isLoading, setLoading] = useState(false);
  const { currentMode } = useSelector(state => state.mode);
  const theme = createTheme({
    palette: {
      mode: currentMode,
    },
  })
  const dispatch = useDispatch();
  const getData = async () => {
    setLoading(true);
    await dispatch(getAllUsers());
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    !isLoading ? (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`${currentMode}`}>
          <div className="min-h-screen bg-gray-50 dark:bg-[#18181b]">
            <BrowserRouter>
              <Routes>
                <Route element={<Login />} path='/login' />
                <Route element={<Signup />} path='/signup' />
                <Route element={<Home />} path='/'>
                  <Route path='edit' element={<EditProfile />} />
                </Route>
                <Route path='*' element={<p>404 Not found</p>} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </ThemeProvider>
    ) : null
  );
}

export default App;
