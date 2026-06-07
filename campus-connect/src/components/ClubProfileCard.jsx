import "./ClubProfileCard.css";
import { useNavigate } from "react-router-dom";

function ClubProfileCard({
  club,
  isAdmin
}) {

  const navigate = useNavigate();

  return (
    <>

      {/* BANNER */}
      <div
        className="club-banner"
        style={{
          backgroundImage: `url(${club.banner})`,
        }}
      >

        <div className="banner-overlay">

          <h1>{club.name}</h1>

          <p>{club.tagline}</p>

          {isAdmin && (

            <div className="banner-buttons">

              <button className="edit-btn">
                Change Banner
              </button>

              <button className="edit-btn">
                Change Logo
              </button>

            </div>

          )}

        </div>

      </div>

      {/* PROFILE CARD */}
      <div className="profile-card">

        {/* ABOUT */}
        <section>

          <h3>About Club</h3>

          {isAdmin ? (

            <textarea
              defaultValue={club.about}
              className="edit-textarea"
            />

          ) : (

            <p>{club.about}</p>

          )}

        </section>

        {/* VISION */}
        <section>

          <h3>Vision</h3>

          {isAdmin ? (

            <textarea
              defaultValue={club.vision}
              className="edit-textarea"
            />

          ) : (

            <p>{club.vision}</p>

          )}

        </section>

        {/* FACULTY */}
        <section>

          <h3>Faculty Coordinator</h3>

          {isAdmin ? (

            <input
              type="text"
              defaultValue={club.faculty}
              className="edit-input"
            />

          ) : (

            <p>{club.faculty}</p>

          )}

        </section>

        {/* TEAM */}
        <section>

          <h3>Core Team</h3>

          {club.team.map((member, index) => (

            <div
              key={index}
              className="editable-row"
            >

              {isAdmin ? (

                <>
                  <input
                    type="text"
                    defaultValue={member}
                    className="edit-input"
                  />

                  <button className="delete-small">
                    Delete
                  </button>
                </>

              ) : (

                <p>{member}</p>

              )}

            </div>

          ))}

          {isAdmin && (
            <button className="add-btn">
              + Add Team Member
            </button>
          )}

        </section>

        {/* EVENTS */}
        <section>

          <h3>Current Events</h3>

          {club.events.map((event, index) => (

            <div
              key={index}
              className="editable-row"
            >

              {isAdmin ? (

                <>
                  <input
                    type="text"
                    defaultValue={event}
                    className="edit-input"
                  />

                  <button className="delete-small">
                    Delete
                  </button>
                </>

              ) : (

                <p>{event}</p>

              )}

            </div>

          ))}

          {isAdmin && (
            <button className="add-btn">
              + Add Event
            </button>
          )}

        </section>

        {/* RECRUITMENT */}
        <section>

          <h3>Recruitment Status</h3>

          {isAdmin ? (

            <label className="toggle-container">

              <input type="checkbox" defaultChecked />

              <span className="toggle-slider"></span>

            </label>

          ) : (

            <p className="open-status">
              {club.recruitment}
            </p>

          )}

        </section>

        {/* GALLERY */}
        <section>

          <h3>Gallery</h3>

          <div className="gallery-grid">

            {club.gallery.map((image, index) => (

              <div
                key={index}
                className="gallery-item"
              >

                <img
                  src={image}
                  alt={`Gallery ${index}`}
                  className="gallery-image"
                />

                {isAdmin && (
                  <button className="delete-btn">
                    Delete
                  </button>
                )}

              </div>

            ))}

          </div>

          {isAdmin && (
            <button className="upload-btn">
              Upload Image
            </button>
          )}

        </section>

        {/* SOCIAL LINKS */}
        <section>

          <h3>Social Links</h3>

          {isAdmin ? (

            <div className="social-edit">

              <input
                type="text"
                placeholder="Instagram URL"
                className="edit-input"
              />

              <input
                type="text"
                placeholder="LinkedIn URL"
                className="edit-input"
              />

            </div>

          ) : (

            <div className="social-links">

              <a href="/">
                Instagram
              </a>

              <a href="/">
                LinkedIn
              </a>

            </div>

          )}

        </section>

        {/* ACTION BUTTONS */}
        <div className="action-buttons">

          <button
            onClick={() =>
              navigate("/apply/event-registration")
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

          {isAdmin && (

            <button className="save-btn">
              Save Changes
            </button>

          )}

        </div>

      </div>

    </>
  );
}

export default ClubProfileCard;