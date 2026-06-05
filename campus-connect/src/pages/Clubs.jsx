import { useState } from "react";
import ClubCard from "../components/ClubCard";
import "./Clubs.css";

function Clubs() {
  const clubs = [
    {
      id: 1,
      name: "Coding Club",
      description: "Learn programming and participate in hackathons.",
      members: 120,
      joined: true,
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 2,
      name: "Photography Club",
      description: "Improve photography skills.",
      members: 60,
      joined: true,
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  
  ];

  const [search, setSearch] = useState("");
  const [showMyClubs, setShowMyClubs] = useState(false);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMyClubs = showMyClubs
      ? club.joined
      : true;

    return matchesSearch && matchesMyClubs;
  });

  return (
    <div className="clubs-page">
      <div className="clubs-navbar">
        <h2>🏛 Clubs</h2>

        <div className="nav-actions">
          <input
            type="text"
            placeholder="Search Clubs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            onClick={() =>
              setShowMyClubs(!showMyClubs)
            }
          >
            {showMyClubs
              ? "All Clubs"
              : "My Clubs"}
          </button>
        </div>
      </div>

      <h1>
        {showMyClubs
          ? "My Clubs"
          : "Explore Clubs"}
      </h1>

      <div className="clubs-grid">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
            />
          ))
        ) : (
          <h2>No Clubs Found</h2>
        )}
      </div>
    </div>
  );
}

export default Clubs;