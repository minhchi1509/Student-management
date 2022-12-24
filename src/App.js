import { BrowserRouter, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import useCustomTheme from "./hooks/useCustomTheme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "./redux/features/userSlice";
import { routes } from "./routes";
import { useState } from "react";

function App() {
  const theme = useCustomTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await dispatch(getAllUsers());
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    !loading ? (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`${theme.palette.mode}`}>
          <div className="min-h-screen bg-gray-50 dark:bg-[#18181b]">
            <BrowserRouter>
              <Routes>
                {routes}
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </ThemeProvider>
    ) : null
  );
}

export default App;
