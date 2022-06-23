import React from 'react';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

// components, code spliting - 페이지단위로
const LogIn = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="*" element={<Navigate to="/LogIn" replace />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
