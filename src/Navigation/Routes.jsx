import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

import Board from '@/pages/Board/Board';
import Home from '@/pages/Home';
import Trash from '../pages/Trash'
import Favourite from '../pages/Favourite'
import NotFound from '@/pages/NotFound';

const RoutesComponent = () => { 
  return (
    <Router>
      <Routes> // Updated component
        <Route exact path="/" element={<Home />} /> 
        <Route exact path="/trash" element={<Trash />} /> 
        <Route exact path="/favourites" element={<Favourite />} /> 
        <Route path="/board/:id" element={<Board />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
};

export default RoutesComponent;