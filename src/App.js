import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Patient from './page/Patient';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Patient />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
