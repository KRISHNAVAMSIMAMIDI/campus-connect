import "./ClubProfileCard.css";
import { useNavigate } from "react-router-dom";

function ClubProfileCard({ club }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Banner */}
      <div
        className="club-banner"
        style={{
          backgroundImage: `url(${club.banner})`,
        }}
      >
        <div className="banner-overlay">
          <h1>{club.name}</h1>
          <p>{club.tagline}</p>
        </div>
      </div>

      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <img
            src={club.logo}
            alt={club.name}
            className="club-logo"
          />

          <div>
            <h2>{club.name}</h2>
            <p>{club.tagline}</p>
          </div>
        </div>

        {/* About */}
        <section>
          <h3>About Club</h3>
          <p>{club.about}</p>
        </section>

        {/* Vision */}
        <section>
          <h3>Vision</h3>
          <p>{club.vision}</p>
        </section>

        {/* Mission */}
        <section>
          <h3>Mission</h3>

          <ul>
            {club.mission.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Faculty */}
        <section>
          <h3>Faculty Coordinator</h3>
          <p>{club.faculty}</p>
        </section>

        {/* Side by Side */}
        <div className="two-column">
          <section>
            <h3>Core Team</h3>

            <ul>
              {club.team.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Current Events</h3>

            <ul>
              {club.events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Recruitment */}
        <section>
          <h3>Recruitment Status</h3>

          <p className="open-status">
            {club.recruitment}
          </p>
        </section>

        {/* Gallery */}
        <section>
          <h3>Gallery</h3>

          <div className="gallery-grid">
            {club.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index}`}
                className="gallery-image"
              />
            ))}
          </div>
        </section>

        {/* Social */}
        <section>
          <h3>Social Links</h3>

          <div className="social-links">
            <a href="/">Instagram</a>
            <a href="/">LinkedIn</a>
            <a href="/">GitHub</a>
          </div>
        </section>

        {/* Buttons */}
        <div className="action-buttons">
          <button onClick={() => navigate("/apply/event-registration")}>Apply To Join</button>
          <button onClick={() => navigate("/message")}>Message Club</button>
        </div>
      </div>
    </>
  );
}

export default ClubProfileCard;