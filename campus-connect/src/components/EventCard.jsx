import "./../pages/Events.css";

function EventCard({
  image,
  title,
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

        <p>📅 {date}</p>

        <p>📍 {venue}</p>

        <button onClick={onClick}>
          View Details
        </button>

      </div>

    </div>
  );
}

export default EventCard;
