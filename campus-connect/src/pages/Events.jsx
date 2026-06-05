import React from "react";
import "./Events.css";

function Events() {
  return (

    <div className="events-page">

      <h1 className="events-title">
        Campus Events
      </h1>

      <p className="events-subtitle">
        Explore technical events, workshops, cultural fests,
        sports competitions, and academic activities happening
        across your campus.
      </p>

      <div className="events-container">

        {/* TECHNICAL CARD */}
        <div className="event-card">

          <img
            src="https://picsum.photos/400/220?random=1"
            alt="Technical Event"
          />

          <div className="event-content">

            <span className="category technical">
              Technical
            </span>

            <h2>
              Hackathon 2026
            </h2>

            <p>
              Participate in a 24-hour coding challenge and
              build innovative solutions with your team.
            </p>

            <button>
              View Event
            </button>

          </div>

        </div>

        {/* WORKSHOP CARD */}
        <div className="event-card">

          <img
            src="https://picsum.photos/400/220?random=2"
            alt="Workshop"
          />

          <div className="event-content">

            <span className="category workshop">
              Workshop
            </span>

            <h2>
              Web Development Bootcamp
            </h2>

            <p>
              Learn React, frontend development, and modern
              UI building techniques from industry mentors.
            </p>

            <button>
              Register
            </button>

          </div>

        </div>

        {/* CULTURAL CARD */}
        <div className="event-card">

          <img
            src="https://picsum.photos/400/220?random=3"
            alt="Cultural Event"
          />

          <div className="event-content">

            <span className="category cultural">
              Cultural
            </span>

            <h2>
              Campus Music Fest
            </h2>

            <p>
              Enjoy live performances, dance competitions,
              and exciting cultural celebrations.
            </p>

            <button>
              Explore
            </button>

          </div>

        </div>

        {/* SPORTS CARD */}
        <div className="event-card">

          <img
            src="https://picsum.photos/400/220?random=4"
            alt="Sports Event"
          />

          <div className="event-content">

            <span className="category sports">
              Sports
            </span>

            <h2>
              Inter College Cricket League
            </h2>

            <p>
              Compete with teams across colleges and showcase
              your sporting excellence.
            </p>

            <button>
              Join Tournament
            </button>

          </div>

        </div>

        {/* ACADEMIC CARD */}
        <div className="event-card">

          <img
            src="https://picsum.photos/400/220?random=5"
            alt="Academic Event"
          />

          <div className="event-content">

            <span className="category academic">
              Academic
            </span>

            <h2>
              Research Seminar 2026
            </h2>

            <p>
              Attend expert talks, paper presentations,
              and advanced research discussions.
            </p>

            <button>
              Attend
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Events;