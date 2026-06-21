import { useState } from "react";
import "./CreateClub.css";
import { createClub } from "../services/api";

function CreateClub() {

  const [club, setClub] = useState({
    name: "",
    faculty: "",
    clubAdminEmail: ""
  });

  const handleChange = (e) => {
    setClub({
      ...club,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createClub(club);

      alert(
        "Club Created Successfully!\nClub Admin Assigned."
      );

      setClub({
        name: "",
        faculty: "",
        clubAdminEmail: ""
      });

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to create club"
      );
    }
  };

  return (
    <div className="create-club-page">

      <div className="create-club-card">

        <h2>Create New Club</h2>

        <p className="sub-text">
          Create a club and assign a Club Admin.
          Remaining details can be updated later
          by the Club Admin.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Club Name *</label>

            <input
              type="text"
              name="name"
              placeholder="Coding Club"
              value={club.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Faculty Coordinator *</label>

            <input
              type="text"
              name="faculty"
              placeholder="Dr. Srinivas Rao"
              value={club.faculty}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Club Admin Email *</label>

            <input
              type="email"
              name="clubAdminEmail"
              placeholder="student@gvpce.ac.in"
              value={club.clubAdminEmail}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="create-btn"
          >
            Create Club
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateClub;