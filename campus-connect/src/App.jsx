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
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import Recruitments from "./pages/Recruitments";
import ApplicationForm from "./pages/ApplicationForm";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ClubAdmin from "./pages/ClubAdmin";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import EventOrganizerDashboard from "./pages/EventOrganizerDashboard";
import Messages from "./pages/Messages";

function App() {
  return (
    <Router>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        <Route 
          path="/messages"
          element={<Messages />}
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
            path="clubs/:id"
            element={<ClubProfile />}
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
            path="events/:id"
            element={<EventDetails />}
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
          path="/super-admin"
          element={<SuperAdminDashboard />}
        />

        <Route
          path="/event-organizer"
          element={<EventOrganizerDashboard />}
        />

        <Route
          path="/clubs"
          element={<Clubs />}
        />
        <Route
          path="/clubs/:id"
          element={<ClubProfile />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/events/:id"
          element={<EventDetails />}
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
        <Route
          path="/club-admin"
          element={<ClubAdmin />}
        />

      </Routes>

    </Router>
  );
}

export default App;
