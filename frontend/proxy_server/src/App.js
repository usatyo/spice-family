import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Timer from './pages/Timer'
import Result from './pages/Result'
import Prepare from './pages/Prepare'
import Record from './pages/Record'

function App() {
  var primaryColor = '#59A4CB';
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='/result' element={<Result />} />
        <Route path='/prepare' element={<Prepare />} />
        <Route path='/record' element={<Record />} />
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
