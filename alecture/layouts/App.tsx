import React from 'react';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';

// components
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
