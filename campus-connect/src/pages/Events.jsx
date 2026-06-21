import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Events.css";

import EventCard from "../components/EventCard";

import { getAllEvents } from "../services/api";

function Events() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const response = await getAllEvents();

        setEvents(response.data);

      } catch (error) {

        console.error(
          "Error loading events:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchEvents();

  }, []);

  // Listen for events created by ClubAdmin (stored in localStorage)
  useEffect(() => {
    const addEventToState = (newEvent) => {
      if (!newEvent) return;
      setEvents((prev) => {
        if (prev.some((e) => e.id === newEvent.id)) return prev;
        return [newEvent, ...prev];
      });
    };

    const storageHandler = (e) => {
      if (e.key === "newEvent" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          addEventToState(parsed);
        } catch (err) {
          console.warn("Failed parsing newEvent from storage", err);
        }
      }
    };

    const customHandler = (e) => {
      // Custom event dispatched from same tab
      if (e && e.detail) {
        addEventToState(e.detail);
      }
    };

    window.addEventListener("storage", storageHandler);
    window.addEventListener("newEvent", customHandler);

    // Check if there's a pending newEvent on mount
    try {
      const existing = localStorage.getItem("newEvent");
      if (existing) {
        const parsed = JSON.parse(existing);
        addEventToState(parsed);
      }
    } catch (err) {
      console.warn("Failed reading newEvent from localStorage", err);
    }

    return () => {
      window.removeEventListener("storage", storageHandler);
      window.removeEventListener("newEvent", customHandler);
    };
  }, []);

  if (loading) {

    return (
      <div className="events-page">
        <h2 style={{ textAlign: "center" }}>
          Loading Events...
        </h2>
      </div>
    );

  }

  return (

    <div className="events-page">

      <h1 className="events-title">
        Campus Events
      </h1>

      <p className="events-subtitle">

        Discover exciting technical events,
        workshops, hackathons, cultural fests,
        sports competitions and academic
        activities happening across your campus.

      </p>

      <div className="events-hero">

        <p className="hero-desc">

          Participate, learn, compete and
          showcase your talents. Explore
          upcoming events and register to
          become part of the campus experience.

        </p>

      </div>

      {events.length === 0 ? (

        <div
          style={{
            textAlign: "center",
            marginTop: "50px"
          }}
        >
          <h2>No Events Available</h2>
        </div>

      ) : (

        <div className="events-container">

          {events.map((event) => (

            <EventCard

              key={event.id}

              image={event.imageUrl}

              title={event.eventName}

              clubName={
                event.clubName ||
                event.club?.name ||
                event.organizer
              }

              venue={event.venue}

              date={event.eventDate}

              status={event.status}

              onClick={() =>
                navigate(`${event.id}`, { relative: "path" })
              }

            />

          ))}

        </div>

      )}

    </div>

  );

}

export default Events;
