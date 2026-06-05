import "./ClubCard.css";
import { useNavigate } from "react-router-dom";

function ClubCard({ club }) {
  const navigate = useNavigate();

  return (
    <div className="club-card">
      <div className="club-header">
        <img
          src={club.logo}
          alt={club.name}
          className="club-logo"
        />

        <div className="club-badge">
          🔥 Active Club
        </div>
      </div>

      <h3>{club.name}</h3>

      <p>{club.description}</p>

      <div className="members">
        👥 {club.members} Members
      </div>

      <div className="btn-group">
        <button
          className="join-btn"
           onClick={() => navigate("/apply/club-membership")}
        >
          🚀 Join Now
        </button>

        <button
          className="explore-btn"
          onClick={() => navigate("/ClubProfile")}
        >
          🔍 Explore
        </button>
      </div>
    </div>
  );
}

export default ClubCard;

