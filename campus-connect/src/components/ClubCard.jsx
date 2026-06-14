import "./ClubCard.css";
import { useNavigate } from "react-router-dom";

function ClubCard({ club }) {

  const navigate = useNavigate();

  return (

    <div className="club-card">

      <div className="club-header">

        <img
          src={club.logoUrl}
          alt={club.name}
          className="club-logo"
          onError={(e) => {
            e.target.src =
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
          }}
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
          onClick={() =>
            navigate("/apply/club-membership")
          }
        >
          🚀 Join Now
        </button>

        <button
          className="explore-btn"
          onClick={() =>
            navigate(`/clubs/${club.id}`)
          }
        >
          🔍 Explore
        </button>

      </div>

    </div>

  );
}

export default ClubCard;

