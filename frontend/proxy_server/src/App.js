import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Timer from './pages/Timer'
import Result from './pages/Result'

function App() {
  var primaryColor = '#59A4CB';
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

const AppContainer = () => {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  )
}

export default AppContainer;
