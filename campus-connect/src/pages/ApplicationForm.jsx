import React from "react";
import { useParams } from "react-router-dom";
import "./ApplicationForm.css";

function ApplicationForm() {

  const { role } = useParams();

  return (

    <div className="application-page">

      <form className="application-card">

        <h2 className="application-title">
          Application Form
        </h2>

        {/* ROLE */}
        <div className="selected-role">

          Applying For:
          <span>
            {role}
          </span>

        </div>

        {/* NAME */}
        <label>
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter Full Name"
        />

        {/* EMAIL */}
        <label>
          College Email
        </label>

        <input
          type="email"
          placeholder="student@gvp.edu"
        />

        {/* ROLL NUMBER */}
        <label>
          Roll Number
        </label>

        <input
          type="text"
          placeholder="Enter Roll Number"
        />

        {/* DEPARTMENT */}
        <label>
          Department
        </label>

        <input
          type="text"
          placeholder="CSE / ECE / IT"
        />

        {/* YEAR */}
        <label>
          Year
        </label>

        <input
          type="text"
          placeholder="1st / 2nd / 3rd / 4th"
        />

        {/* SKILLS */}
        <label>
          Skills
        </label>

        <textarea
          placeholder="Mention your skills..."
        ></textarea>

        {/* WHY JOIN */}
        <label>
          Why do you want to join?
        </label>

        <textarea
          placeholder="Write your motivation..."
        ></textarea>

        {/* BUTTON */}
        <button type="submit">
          Submit Application
        </button>

      </form>

    </div>

  );
}

export default ApplicationForm;