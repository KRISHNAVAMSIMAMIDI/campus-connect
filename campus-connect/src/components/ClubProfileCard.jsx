import "./ClubProfileCard.css";

function ClubProfileCard({ club }) {
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

      <div className="club-profile-card">
        {/* Header */}
        <div className="club-profile-header">
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
        <section className="club-profile-section">
          <h3>About Club</h3>
          <p>{club.about}</p>
        </section>

        {/* Vision */}
        <section className="club-profile-section">
          <h3>Vision</h3>
          <p>{club.vision}</p>
        </section>

        {/* Mission */}
        <section className="club-profile-section">
          <h3>Mission</h3>

          <ul>
            {club.mission.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Faculty */}
        <section className="club-profile-section">
          <h3>Faculty Coordinator</h3>
          <p>{club.faculty}</p>
        </section>

        {/* Side by Side */}
        <div className="club-profile-two-column">
          <section className="club-profile-section">
            <h3>Core Team</h3>

            <ul>
              {club.team.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </section>

          <section className="club-profile-section">
            <h3>Current Events</h3>

            <ul>
              {club.events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Recruitment */}
        <section className="club-profile-section">
          <h3>Recruitment Status</h3>

          <p className="club-profile-open-status">
            {club.recruitment}
          </p>
        </section>

        {/* Gallery */}
        <section className="club-profile-section">
          <h3>Gallery</h3>

          <div className="club-profile-gallery-grid">
            {club.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index}`}
                className="club-profile-gallery-image"
              />
            ))}
          </div>
        </section>

        {/* Social */}
        <section className="club-profile-section">
          <h3>Social Links</h3>

          <div className="club-profile-social-links">
            <a href="/">Instagram</a>
            <a href="/">LinkedIn</a>
            <a href="/">GitHub</a>
          </div>
        </section>

        {/* Buttons */}
        <div className="club-profile-action-buttons">
          <button>Apply To Join</button>
          <button>Message Club</button>
        </div>
      </div>
    </>
  );
}

export default ClubProfileCard;
