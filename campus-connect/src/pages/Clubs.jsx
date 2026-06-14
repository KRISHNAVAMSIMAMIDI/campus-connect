import { useState, useEffect } from "react";
import ClubCard from "../components/ClubCard";
import "./Clubs.css";
import { getAllClubs, getUserClubs } from "../services/api";

const normalizeResponseArray = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (payload.data) return normalizeResponseArray(payload.data);
  if (payload.memberships) return normalizeResponseArray(payload.memberships);
  if (payload.clubs) return normalizeResponseArray(payload.clubs);
  if (payload.userClubs) return normalizeResponseArray(payload.userClubs);
  if (payload.items) return normalizeResponseArray(payload.items);
  if (typeof payload === "object") {
    const arrayValue = Object.values(payload).find((value) => Array.isArray(value));
    if (arrayValue) return normalizeResponseArray(arrayValue);
  }
  return [];
};

function Clubs() {

  const [clubs, setClubs] = useState([]);

  const [search, setSearch] = useState("");

  const [showMyClubs, setShowMyClubs] = useState(false);

  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const [userClubs, setUserClubs] = useState([]);

  useEffect(() => {

    const fetchClubs = async () => {

      try {

        const response =
          await getAllClubs();

        setClubs(response.data);

      } catch (error) {

        console.error(
          "Error loading clubs",
          error
        );

      }

    };

    fetchClubs();

  }, []);

  const getUserId = (userData) => {
    return (
      userData?.id ||
      userData?._id ||
      userData?.userId ||
      userData?.uid ||
      null
    );
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        const userId = getUserId(parsedUser);
        if (userId) {
          getUserClubs(userId)
            .then((response) => {
              console.log("User clubs response", response.data);
              setUserClubs(normalizeResponseArray(response.data));
            })
            .catch((error) => {
              console.error("Error loading user clubs", error);
            });
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const parseClubMemberships = (memberships = []) => {
    return memberships
      .map((membership) => {
        if (!membership) return null;

        if (membership.club && typeof membership.club === "object") {
          return {
            id: membership.club.id || membership.club.clubId || membership.club.club_id,
            name:
              membership.club.name ||
              membership.club.clubName ||
              membership.club.club_name,
          };
        }

        if (membership.clubId || membership.clubName || membership.club_id || membership.club_name) {
          return {
            id: membership.clubId || membership.club_id,
            name: membership.clubName || membership.club_name,
          };
        }

        if (membership.id && membership.name) {
          return {
            id: membership.id,
            name: membership.name,
          };
        }

        if (membership.clubInfo || membership.club_data || membership.clubData) {
          const clubData = membership.clubInfo || membership.club_data || membership.clubData;
          return {
            id:
              clubData?.id || clubData?.clubId || clubData?.club_id,
            name:
              clubData?.name || clubData?.clubName || clubData?.club_name,
          };
        }

        if (membership.club_id || membership.club_name) {
          return {
            id: membership.club_id,
            name: membership.club_name,
          };
        }

        if (membership.clubId || membership.clubName) {
          return {
            id: membership.clubId,
            name: membership.clubName,
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  const normalizeId = (value) => {
    if (value === null || value === undefined) return null;
    return String(value).trim();
  };

  const normalizeName = (value) => {
    if (!value) return null;
    return String(value).trim().toLowerCase();
  };

  const joinedClubs = parseClubMemberships(userClubs);
  const joinedClubIds = joinedClubs
    .map((club) => normalizeId(club.id))
    .filter(Boolean);
  const joinedClubNames = joinedClubs
    .map((club) => normalizeName(club.name))
    .filter(Boolean);

  const joinedClubIdSet = new Set(joinedClubIds);
  const joinedClubNameSet = new Set(joinedClubNames);

  const userJoinedClubs = parseClubMemberships(
    normalizeResponseArray(user?.joinedClubs || user?.clubs || user?.userClubs)
  );
  const joinedClubIdSetFromUser = new Set(
    userJoinedClubs.map((club) => normalizeId(club.id)).filter(Boolean)
  );
  const joinedClubNameSetFromUser = new Set(
    userJoinedClubs.map((club) => normalizeName(club.name)).filter(Boolean)
  );

  const isClubJoined = (club) => {
    return (
      club.isMember ||
      club.joined ||
      joinedClubIdSet.has(normalizeId(club.id)) ||
      joinedClubNameSet.has(normalizeName(club.name)) ||
      joinedClubIdSetFromUser.has(normalizeId(club.id)) ||
      joinedClubNameSetFromUser.has(normalizeName(club.name))
    );
  };

  const filteredClubs = clubs.filter(
    (club) => {

      const matchesSearch =
        club.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesMyClubs =
        showMyClubs ? isClubJoined(club) : true;

      return matchesSearch && matchesMyClubs;

    }
  );

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
              setSearch(
                e.target.value
              )
            }
          />

          <button
            onClick={() =>
              setShowMyClubs(
                !showMyClubs
              )
            }
          >
            {showMyClubs
              ? "All Clubs"
              : "My Clubs"}
          </button>

        </div>

      </div>

      <h1>
        Explore Clubs
      </h1>

      <div className="clubs-grid">

        {filteredClubs.length > 0 ? (

          filteredClubs.map(
            (club) => (

              <ClubCard
                key={club.id}
                club={club}
              />

            )
          )

        ) : (

          <h2>
            No Clubs Found
          </h2>

        )}

      </div>

    </div>

  );
}

export default Clubs;