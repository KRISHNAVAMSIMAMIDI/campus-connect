import ClubCard from "../components/ClubCard";
import "./Clubs.css";

function Clubs() {
  const clubs = [
    {
      id: 1,
      name: "Coding Club",
      description:
        "Learn programming and participate in hackathons.",
      members: 120,
      logo:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 2,
      name: "Robotics Club",
      description:
        "Build robots and IoT projects.",
      members: 85,
      logo:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 3,
      name: "Photography Club",
      description:
        "Improve photography skills.",
      members: 60,
      logo:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 4,
      name: "Dance Club",
      description:
        "Perform and learn dance styles.",
      members: 90,
      logo:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 5,
      name: "AI Club",
      description:
        "Explore AI, ML and Data Science.",
      members: 110,
      logo:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 6,
      name: "Sports Club",
      description:
        "Participate in sports activities.",
      members: 140,
      logo:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  ];

  return (
    <div className="clubs-page">
      <div className="clubs-navbar">
        <h2>🏛 Clubs</h2>

        <div className="nav-actions">
          <input
            type="text"
            placeholder="Search Clubs..."
          />

          <button>My Clubs</button>
        </div>
      </div>

      <h1>Explore Clubs</h1>

      <div className="clubs-grid">
        {clubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
          />
        ))}
      </div>
    </div>
  );
}

export default Clubs;