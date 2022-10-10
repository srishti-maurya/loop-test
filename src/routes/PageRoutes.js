import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Bookmark } from '../pages/Bookmark';
import { Home } from '../pages/Home';
import { Liked } from '../pages/Liked';
import { Login } from '../pages/Login';
import { PrivateRoute } from './PrivateRoute';

export function PageRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/liked" element={<Liked />} />
      </Route>
    </Routes>
  );
}
