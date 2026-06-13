import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../services/api";
import "./Events.css";

function EventDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {

    const loadEvent = async () => {

      try {

        const response =
          await getEventById(id);

        setEvent(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    loadEvent();

  }, [id]);

  if (!event) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="event-details-page">

      <img
        className="event-banner"
        src={event.imageUrl}
        alt={event.eventName}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4";
        }}
      />

      <div className="event-details-container">

        <span className="event-status">
          {event.status}
        </span>

        <h1>
          {event.eventName}
        </h1>

        <div className="event-info">

          <p>
            📅 <strong>Date:</strong>
            {" "}
            {event.eventDate}
          </p>

          <p>
            📍 <strong>Venue:</strong>
            {" "}
            {event.venue}
          </p>

          <p>
            👨 <strong>Organizer:</strong>
            {" "}
            {event.organizer}
          </p>

        </div>

        <div className="event-description">

          <h2>
            About This Event
          </h2>

          <p>
            {event.description}
          </p>

        </div>

        <button
          className="register-btn"
          onClick={() =>
            navigate(`/apply/${event.id}`)
          }
        >
          Register Now
        </button>

      </div>

    </div>

  );
}

export default EventDetails;