import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import store from './redux/store';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <Provider store={store}>
      <AppProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppProvider>
    </Provider>
    <GlobalStyle />
  </>
);

export default App;
