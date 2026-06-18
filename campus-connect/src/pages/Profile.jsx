import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileLogo from "../assets/profile-logo.svg";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem("user")
        );

        const email = storedUser?.email ?? storedUser?.user?.email;

        if (!email) {
          alert("Unable to load profile: user email not found.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/users/profile/${encodeURIComponent(email)}`
        );

        setUserData(response.data);

      } catch (error) {
        console.error(error);
        alert("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const [stats] = useState({
    clubs: 0,
    events: 0,
    certificates: 0,
    recruitments: 0
  });

  const [joinedClubs] = useState([]);

  const handleRemoveRequest = (clubName) => {
    alert(
      `Remove request for ${clubName} has been sent to the club head.`
    );
  };

  if (!userData) {
    return (
      <main className="profile-page">

        <div className="profile-header">

          <h1>My Profile</h1>

        </div>

        <div className="profile-container">
          Loading Profile...
        </div>

      </main>
    );
  }

  return (
    <main className="profile-page">

      {/* HEADER */}

      <div className="profile-header">


        <h1>My Profile</h1>

      </div>

      <div className="profile-container">

        {/* PROFILE CARD */}

        <div className="profile-card">

          <div className="profile-header-section">

            <img
              src={userData.profilePicture?.trim() || profileLogo}
              onError={(e) => {
                e.currentTarget.src = profileLogo;
              }}
              alt="Profile"
              className="profile-picture"
            />

            <div className="profile-basic-info">

              <h2>{userData.name}</h2>

              <p className="department">
                {userData.branch}
              </p>

              <div className="contact-info">

                <span>
                  📧 {userData.email}
                </span>


              </div>

            </div>

          </div>

          {/* STUDENT DETAILS */}

          <div className="additional-info">

              <div className="info-item">
                <span className="label">
                  Roll Number
                </span>

                <span className="value">
                  {userData.rollNumber}
                </span>
              </div>

              <div className="info-item">
                <span className="label">
                  Branch
                </span>

                <span className="value">
                  {userData.branch}
                </span>
              </div>

              <div className="info-item">
                <span className="label">
                  Passout Year
                </span>

                <span className="value">
                  {userData.passoutYear}
                </span>
              </div>

              <div className="info-item">
                <span className="label">
                  Role
                </span>

                <span className="value">
                  {userData.role}
                </span>
              </div>

          </div>

        </div>

        {/* STATS */}

        <div className="stats-container">

          <div className="stat-card">
            <h3>{stats.clubs}</h3>
            <p>Joined Clubs</p>
          </div>

          <div className="stat-card">
            <h3>{stats.events}</h3>
            <p>Events Attended</p>
          </div>

          <div className="stat-card">
            <h3>{stats.certificates}</h3>
            <p>Certificates</p>
          </div>

          <div className="stat-card">
            <h3>{stats.recruitments}</h3>
            <p>Recruitments</p>
          </div>

        </div>

        {/* JOINED CLUBS */}

        <div className="joined-clubs-section">

          <div className="section-header">

            <h3>
              Clubs Joined ({joinedClubs.length})
            </h3>

          </div>

          {joinedClubs.length > 0 ? (

            <div className="clubs-list">

              {joinedClubs.map((club) => (

                <div
                  key={club.id}
                  className="club-item"
                >

                  <img
                    src={club.logo}
                    alt={club.name}
                    className="club-item-logo"
                  />

                  <div className="club-item-info">

                    <h4>{club.name}</h4>

                    <p>{club.description}</p>

                    <div className="club-meta">

                      <span className="joined-date">
                        Joined:
                        {" "}
                        {new Date(
                          club.joinedDate
                        ).toLocaleDateString()}
                      </span>

                      <span className="role-badge">
                        {club.role}
                      </span>

                    </div>

                  </div>

                  <div className="club-actions">

                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(
                          "/dashboard/club-profile"
                        )
                      }
                    >
                      View
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleRemoveRequest(club.name)
                      }
                    >
                      Remove Request
                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="no-clubs">

              <p>
                You haven't joined any clubs yet.
              </p>

              <button
                className="explore-btn"
                onClick={() =>
                  navigate("/dashboard/clubs")
                }
              >
                Explore Clubs
              </button>

            </div>

          )}

        </div>

        {/* ACCOUNT SETTINGS */}

        <div className="account-section">

          <h3>Account Settings</h3>

          <div className="settings-list">

            <button
              className="settings-btn"
              onClick={() =>
                navigate("/dashboard/settings")
              }
            >
              Change Password
            </button>

            <button className="settings-btn">
              Notification Preferences
            </button>

            <button
              className="settings-btn"
              onClick={() =>
                navigate("/dashboard/help")
              }
            >
              Help & Support
            </button>

            <button
              className="settings-btn danger"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;
