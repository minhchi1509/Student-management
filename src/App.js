import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import useCustomTheme from "./hooks/useCustomTheme";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./redux/features/userSlice";
import { routes } from "./routes";

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
        {routes}
      </ThemeProvider>
    ) : null
  );
}

export default App;
