import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { amber, teal } from '@material-ui/core/colors';

import configureStore from './store';
import Dictionary from './containers/Dictionary.container';
import logo from './logo.png';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber
  },
});

const store = configureStore();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header bg-green-light pl-1 d-flex">
          <img src={logo} height="55" className="App-logo pr-3" alt="eDictionary" />
          <h3 className="text-green-dark py-2 letter-spacing-1">Have fun learning</h3>
        </header>

        <Provider store={store}>
          <div className="w-100 d-flex justify-content-center text-black">
            <Dictionary />
          </div>
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
