import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState(null);

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
        setEditData(response.data);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

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
              src={userData.profilePicture}
              alt="Profile"
              className="profile-picture"
            />

            <div className="profile-basic-info">

              <h2>{userData.name}</h2>

              <p className="bio">
                {userData.role}
              </p>

              <div className="contact-info">

                <span>
                  📧 {userData.email}
                </span>


              </div>

            </div>

            <button
              className={`edit-btn ${
                isEditing ? "cancel" : ""
              }`}
              onClick={() =>
                isEditing
                  ? handleCancel()
                  : setIsEditing(true)
              }
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>

          </div>

          {/* EDIT FORM */}

          {isEditing && (

            <div className="edit-form">

              <div className="form-group">

                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={editData.name || ""}
                  onChange={handleInputChange}
                />

              </div>

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={editData.email || ""}
                  onChange={handleInputChange}
                />

              </div>

              <div className="form-group">

                <label>Roll Number</label>

                <input
                  type="text"
                  name="rollNumber"
                  value={editData.rollNumber || ""}
                  onChange={handleInputChange}
                />

              </div>

              <div className="form-group">

                <label>Branch</label>

                <input
                  type="text"
                  name="branch"
                  value={editData.branch || ""}
                  onChange={handleInputChange}
                />

              </div>

              <div className="form-buttons">

                <button
                  className="save-btn"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

                <button
                  className="cancel-form-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>

            </div>

          )}

          {/* STUDENT DETAILS */}

          {!isEditing && (

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

          )}

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

            <button className="settings-btn">
              Change Password
            </button>

            <button className="settings-btn">
              Notification Preferences
            </button>

            <button className="settings-btn">
              Help & Support
            </button>

            <button className="settings-btn danger">
              Logout
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;
