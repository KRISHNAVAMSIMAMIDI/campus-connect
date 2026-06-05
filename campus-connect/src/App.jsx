import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Recruitments from "./pages/Recruitments";
import ApplicationForm from "./ApplicationForm";

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

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/recruitments"
          element={<Recruitments />}
        />

        <Route
            path="/apply/:role"
            element={<ApplicationForm />}
          />



      </Routes>

    </Router>
  );
}

export default App;
