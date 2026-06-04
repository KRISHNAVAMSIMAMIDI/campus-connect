import "./ClubCard.css";

function ClubCard({ club }) {
  return (
    <div className="club-card">
      <img
        src={club.logo}
        alt={club.name}
        className="club-logo"
      />

      <h3>{club.name}</h3>

      <p>{club.description}</p>

      <div className="members">
        👥 {club.members} Members
      </div>

      <div className="btn-group">
        <button className="join-btn">
          Join
        </button>

        <button className="explore-btn">
          Explore
        </button>
      </div>
    </div>
  );
}

export default ClubCard;