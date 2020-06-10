import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
          <Routes />
        <Footer />
      </BrowserRouter>
    </Provider>      
  );
}

export default App;
