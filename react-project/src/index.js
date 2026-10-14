import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import React from 'react'; 
import { ThemeProvider } from '@material-ui/core/styles';
import { WrapeContextProvider } from './context/WrapeContext';
import { theme } from './styles/theme';
import MaterralTest from './material/materralTest'


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <WrapeContextProvider theme = {theme}>
        <App></App>
        <MaterralTest/>
      </WrapeContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);