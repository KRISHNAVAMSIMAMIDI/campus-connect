import "./ClubProfileCard.css";
import { useNavigate } from "react-router-dom";

function ClubProfileCard({ club }) {

  const navigate = useNavigate();

  return (
    <>

      <div
        className="club-banner"
        style={{
          backgroundImage: `url(${club.bannerUrl})`
        }}
      >
        <div className="banner-overlay">

          <h1>{club.name}</h1>

          <p>{club.tagline}</p>

        </div>
      </div>

      <div className="profile-card">

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          <img
            src={club.logoUrl}
            alt={club.name}
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #FF5733"
            }}
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
            }}
          />
        </div>

        <section>
          <h3>Description</h3>
          <p>{club.description}</p>
        </section>

        <section>
          <h3>About Club</h3>
          <p>{club.about}</p>
        </section>

        <section>
          <h3>Vision</h3>
          <p>{club.vision}</p>
        </section>

        <section>
          <h3>Faculty Coordinator</h3>
          <p>👨‍🏫 {club.faculty}</p>
        </section>

        <section>
          <h3>Club Statistics</h3>

          <p>
            👥 Total Members:
            <strong> {club.members}</strong>
          </p>

          <p className="open-status">
            Recruitment Status:
            <strong> {club.recruitment}</strong>
          </p>
        </section>

        <section>
          <h3>Social Links</h3>

          <div className="social-links">

            {club.instagramUrl && (
              <a
                href={club.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            )}

            {club.linkedinUrl && (
              <a
                href={club.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}

          </div>
        </section>

        <div className="action-buttons">

          <button
            onClick={() =>
              navigate("/apply/club-membership")
            }
          >
            Apply To Join
          </button>

          <button
            onClick={() =>
              navigate("/messages")
            }
          >
            Message Club
          </button>

        </div>

      </div>

    </>
  );
}

export default ClubProfileCard;