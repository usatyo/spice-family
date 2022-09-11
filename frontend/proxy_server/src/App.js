import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Timer from './pages/Timer'
import Result from './pages/Result'
import Prepare from './pages/Prepare'
import Register from './pages/Register'
import Login from './pages/Login'
import History from './pages/History'

function App() {
  var primaryColor = '#59A4CB';
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='/result' element={<Result />} />
        <Route path='/prepare' element={<Prepare />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/history' element={<History />} />
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
