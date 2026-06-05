import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    id: 1,
    name: "Aditya Kumar",
    studentId: "22B31A0501",
    department: "Computer Science & Engineering",
    section: "CSE-A",
    year: 2,

    email: "aditya.kumar@college.edu",
    phone: "+91 9876543210",

    bio: "Passionate about coding, web development and open-source contribution.",

    joinedDate: "2024-01-15",

    profilePicture:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  });

  const [stats] = useState({
    clubs: 5,
    events: 12,
    certificates: 8,
    recruitments: 2
  });

  const [joinedClubs, setJoinedClubs] = useState([
    {
      id: 1,
      name: "Coding Club",
      description: "Learn programming and participate in hackathons.",
      logo:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      joinedDate: "2024-02-01",
      role: "Member"
    },
    {
      id: 2,
      name: "AI Club",
      description: "Explore AI, ML and Data Science.",
      logo:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      joinedDate: "2024-03-10",
      role: "Coordinator"
    }
  ]);

  const [editData, setEditData] = useState(userData);

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

  const handleRemoveClub = (clubId) => {
    setJoinedClubs(
      joinedClubs.filter((club) => club.id !== clubId)
    );
  };

  return (
    <main className="profile-page">

      {/* HEADER */}

      <div className="profile-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

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

              <p className="department">
                {userData.department}
              </p>

              <p className="bio">
                {userData.bio}
              </p>

              <div className="contact-info">

                <span>
                  📧 {userData.email}
                </span>

                <span>
                  📱 {userData.phone}
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
                  value={editData.name}
                  onChange={handleInputChange}
                />

              </div>

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                />

              </div>

              <div className="form-group">

                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                />

              </div>

              <div className="form-group">

                <label>Bio</label>

                <textarea
                  rows="3"
                  name="bio"
                  value={editData.bio}
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
                  Student ID
                </span>

                <span className="value">
                  {userData.studentId}
                </span>
              </div>

              <div className="info-item">
                <span className="label">
                  Department
                </span>

                <span className="value">
                  {userData.department}
                </span>
              </div>

              <div className="info-item">
                <span className="label">
                  Section
                </span>

                <span className="value">
                  {userData.section}
                </span>
              </div>

              <div className="info-item">
                <span className="label">
                  Year
                </span>

                <span className="value">
                  Year {userData.year}
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
                          `/club/${club.id}`
                        )
                      }
                    >
                      View
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleRemoveClub(club.id)
                      }
                    >
                      Leave Club
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
                  navigate("/clubs")
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
