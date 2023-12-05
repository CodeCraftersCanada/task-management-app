import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { routes } from './routes';
import { Home } from './pages';
import Layout from './layout/Layout/Layout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {
            routes.map(route => (
              <Route
                path={route.path}
                element={<route.component />}
                key={route.name}
              />
            ))
          }
        </Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
