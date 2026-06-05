import React from "react";
import "./Recruitments.css";
import { useNavigate } from "react-router-dom";
function Recruitments() {
  const navigate = useNavigate();
  return (

    <div className="recruitments-page">

      <h1 className="recruitments-title">
        Club Recruitments
      </h1>

      <p className="recruitments-subtitle">

        Explore open positions across technical,
        workshop, cultural, sports, and academic
        communities and become a part of campus activities.

      </p>

      <div className="recruitments-container">

        {/* TECHNICAL */}
        <div className="recruitment-card">

          <div className="badge technical">
            Technical
          </div>

          <h2>
            Frontend Developer
          </h2>

          <h3>
            Coding Club
          </h3>

          <p>
            Looking for students interested in React,
            UI development, and web technologies.
          </p>

          <div className="details">
            <span>📅 Deadline: June 20</span>
            <span>👥 Team: Web Development</span>
          </div>

          <button onClick={() => navigate(`/apply/technical`)}>
            Apply Now
          </button>

        </div>

        {/* WORKSHOP */}
        <div className="recruitment-card">

          <div className="badge workshop">
            Workshop
          </div>

          <h2>
            Workshop Coordinator
          </h2>

          <h3>
            Innovation Hub
          </h3>

          <p>
            Help organize technical workshops,
            mentor sessions, and skill-building events.
          </p>

          <div className="details">
            <span>📅 Deadline: June 25</span>
            <span>🎤 Event Management</span>
          </div>

          <button onClick={() => navigate(`/apply/workshop`)}>
            Apply Now
          </button>

        </div>

        {/* CULTURAL */}
        <div className="recruitment-card">

          <div className="badge cultural">
            Cultural
          </div>

          <h2>
            Event Performer
          </h2>

          <h3>
            Cultural Club
          </h3>

          <p>
            Join the music, dance, and entertainment
            teams for upcoming campus festivals.
          </p>

          <div className="details">
            <span>📅 Deadline: July 1</span>
            <span>🎭 Performing Arts</span>
          </div>

          <button onClick={() => navigate(`/apply/cultural`)}>
            Apply Now
          </button>

        </div>

        {/* SPORTS */}
        <div className="recruitment-card">

          <div className="badge sports">
            Sports
          </div>

          <h2>
            Team Captain
          </h2>

          <h3>
            Sports Club
          </h3>

          <p>
            Lead and coordinate college teams
            for inter-college sports competitions.
          </p>

          <div className="details">
            <span>📅 Deadline: June 28</span>
            <span>🏆 Leadership Role</span>
          </div>

          <button onClick={() => navigate(`/apply/sports`)}>
            Apply Now
          </button>

        </div>

        {/* ACADEMIC */}
        <div className="recruitment-card">

          <div className="badge academic">
            Academic
          </div>

          <h2>
            Research Assistant
          </h2>

          <h3>
            Academic Society
          </h3>

          <p>
            Work with faculty members on research,
            seminars, and academic publications.
          </p>

          <div className="details">
            <span>📅 Deadline: July 5</span>
            <span>📚 Research Team</span>
          </div>

          <button onClick={() => navigate(`/apply/academic`)}>
            Apply Now
          </button>

        </div>

      </div>

    </div>

  );
}

export default Recruitments;