import "./Notifications.css";

function Notifications() {

  const notifications = [
    {
      id: 1,
      title: "Coding Club Recruitment Open",
      date: "Today"
    },
    {
      id: 2,
      title: "AI Workshop Registration Started",
      date: "Yesterday"
    },
    {
      id: 3,
      title: "Hackathon Tomorrow",
      date: "2 Days Ago"
    }
  ];

  return (
    <div className="notifications-page">

      <div className="notifications-header">

        <h1>Notifications</h1>

      </div>

      <div className="notifications-container">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            className="notification-card"
          >

            <h3>{notification.title}</h3>

            <p>{notification.date}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notifications;