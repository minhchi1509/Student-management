import { createTheme } from '@mui/material';
import { useSelector } from 'react-redux'

export default function useCustomTheme() {
    const { currentMode } = useSelector(state => state.mode);
    const theme = createTheme({
        palette: {
            mode: currentMode
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 640,
                md: 768,
                lg: 1024,
                xl: 1280,
            }
        }
    })
    return theme;
}
