import React, { useState } from "react";
import "./ClubAdmin.css";

function ClubAdmin() {

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [selectedApplicant, setSelectedApplicant] =
    useState(null);

  const applications = [

    {
      id: 1,
      name: "Sai Krishna",
      role: "Frontend Developer",
      department: "CSE",
      year: "3rd Year",
      skills: "React, CSS, JavaScript",
      reason:
        "I want to contribute to real projects and improve my frontend skills.",
      portfolio:
        "github.com/saikrishna"
    },

    {
      id: 2,
      name: "Harsha Vardhan",
      role: "Event Coordinator",
      department: "ECE",
      year: "2nd Year",
      skills: "Communication, Leadership",
      reason:
        "Interested in organizing technical and cultural events.",
      portfolio:
        "linkedin.com/in/harsha"
    }

  ];

  return (

    <div className="admin-page">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <h2 className="logo">
          Club Admin
        </h2>

        <button
          onClick={() =>
            setActiveSection("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            setActiveSection("events")
          }
        >
          Create Event
        </button>

        <button
          onClick={() =>
            setActiveSection("recruitments")
          }
        >
          Recruitments
        </button>

        <button
          onClick={() =>
            setActiveSection("applications")
          }
        >
          Applications
        </button>

        <button
          onClick={() =>
            setActiveSection("announcements")
          }
        >
          Announcements
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* DASHBOARD */}
        {activeSection === "dashboard" && (

          <div>

            <h1>
              Coding Club Dashboard
            </h1>

            <div className="stats-grid">

              <div className="stat-card">
                <h2>150+</h2>
                <p>Members</p>
              </div>

              <div className="stat-card">
                <h2>12</h2>
                <p>Events</p>
              </div>

              <div className="stat-card">
                <h2>35</h2>
                <p>Applications</p>
              </div>

              <div className="stat-card">
                <h2>5</h2>
                <p>Recruitments</p>
              </div>

            </div>

          </div>

        )}

        {/* CREATE EVENT */}
        {activeSection === "events" && (

          <div className="form-section">

            <h1>Create Event</h1>

            <input
              type="text"
              placeholder="Event Title"
            />

            <textarea
              placeholder="Event Description"
            ></textarea>

            <input type="date" />

            <input
              type="text"
              placeholder="Venue"
            />

            <button>
              Publish Event
            </button>

          </div>

        )}

        {/* RECRUITMENTS */}
        {activeSection === "recruitments" && (

          <div className="form-section">

            <h1>Create Recruitment</h1>

            <input
              type="text"
              placeholder="Role Name"
            />

            <textarea
              placeholder="Requirements"
            ></textarea>

            <input type="date" />

            <button>
              Post Recruitment
            </button>

          </div>

        )}

        {/* APPLICATIONS */}
        {activeSection === "applications" && (

          <div>

            <h1>
              Student Applications
            </h1>

            {applications.map((app) => (

              <div
                key={app.id}
                className="application-card"
              >

                <h2>{app.name}</h2>

                <p>
                  Applying For:
                  <strong>
                    {" "}
                    {app.role}
                  </strong>
                </p>

                {/* DETAILS */}
                {selectedApplicant === app.id && (

                  <div className="details-box">

                    <p>
                      <strong>
                        Department:
                      </strong>
                      {" "}
                      {app.department}
                    </p>

                    <p>
                      <strong>
                        Year:
                      </strong>
                      {" "}
                      {app.year}
                    </p>

                    <p>
                      <strong>
                        Skills:
                      </strong>
                      {" "}
                      {app.skills}
                    </p>

                    <p>
                      <strong>
                        Why Join:
                      </strong>
                      {" "}
                      {app.reason}
                    </p>

                    <p>
                      <strong>
                        Portfolio:
                      </strong>
                      {" "}
                      {app.portfolio}
                    </p>

                  </div>

                )}

                {/* BUTTONS */}
                <div className="application-buttons">

                  <button className="approve">
                    Approve
                  </button>

                  <button className="reject">
                    Reject
                  </button>

                  <button
                    className="details-btn"
                    onClick={() =>

                      setSelectedApplicant(

                        selectedApplicant === app.id
                          ? null
                          : app.id

                      )

                    }
                  >

                    {selectedApplicant === app.id
                      ? "Hide Details"
                      : "View Details"}

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* ANNOUNCEMENTS */}
        {activeSection === "announcements" && (

          <div className="form-section">

            <h1>
              Post Announcement
            </h1>

            <textarea
              placeholder="Write announcement..."
            ></textarea>

            <button>
              Post Announcement
            </button>

          </div>

        )}

      </main>

    </div>

  );
}

export default ClubAdmin;