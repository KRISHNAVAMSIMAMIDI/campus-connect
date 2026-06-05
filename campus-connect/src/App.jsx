import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Clubs from "./pages/Clubs";
import ClubProfile from "./pages/ClubProfile";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Recruitments from "./pages/Recruitments";
import ApplicationForm from "./pages/ApplicationForm";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";


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
        >
          <Route
            path="clubs"
            element={<Clubs />}
          />

          <Route
            path="club-profile"
            element={<ClubProfile />}
          />

          <Route
            path="events"
            element={<Events />}
          />

          <Route
            path="recruitments"
            element={<Recruitments />}
          />

          <Route
            path="apply/:role"
            element={<ApplicationForm />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="notifications"
            element={<Notifications />}
          />
        </Route>

        <Route
          path="/clubs"
          element={<Clubs />}
        />
        <Route path="/ClubProfile" element={<ClubProfile />} />

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



        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

      </Routes>

    </Router>
  );
}

export default App;
