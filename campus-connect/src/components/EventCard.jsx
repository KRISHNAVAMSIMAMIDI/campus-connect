import "./../pages/Events.css";

function EventCard({
  image,
  title,
  clubName,
  venue,
  date,
  status,
  onClick
}) {
  return (
    <div className="event-card">

      <img
        src={image}
        alt={title}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4";
        }}
      />

      <div className="event-content">

        <span className="category technical">
          {status}
        </span>

        <h2>{title}</h2>

        {clubName && (
          <p>
            <strong>Club:</strong> {clubName}
          </p>
        )}

        <p>
          <strong>Date:</strong> {date}
        </p>

        <p>
          <strong>Venue:</strong> {venue}
        </p>

        <button onClick={onClick}>
          View Details
        </button>

      </div>

    </div>
  );
}

export default EventCard;
