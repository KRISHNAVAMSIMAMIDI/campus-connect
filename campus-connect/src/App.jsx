import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Clubs from "./pages/Clubs";

function App() {
  return (
    <Router>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/clubs"
          element={<Clubs />}
        />

      </Routes>

    </Router>
  );
}

export default App;
