import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import store from 'redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StyledEngineProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StyledEngineProvider>
);
