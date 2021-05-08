import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, Grid, createMuiTheme, CssBaseline } from '@material-ui/core';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center">
        <App />
      </Grid>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
