import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch } from "react-redux";

import { Loading } from "./common/Modal";
import useCustomTheme from "./hooks/useCustomTheme";
import { getAllUsers } from "./redux/features/userSlice";
import appRoutes from "./routes";

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
        {appRoutes}
      </ThemeProvider>
    ) : <Loading isOpen={true} />
  );
}

export default App;
