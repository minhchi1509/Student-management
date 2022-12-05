import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material';
import store from './redux/store';
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </StyledEngineProvider>
);
