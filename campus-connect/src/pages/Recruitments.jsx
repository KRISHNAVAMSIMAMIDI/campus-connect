import React, { useEffect, useState } from "react";
import "./Recruitments.css";
import { useNavigate } from "react-router-dom";
import { getAllRecruitments } from "../services/api";

function Recruitments() {

  const navigate = useNavigate();

  const [recruitments, setRecruitments] = useState([]);

  useEffect(() => {

    const loadRecruitments = async () => {

      try {

        const response = await getAllRecruitments();

        setRecruitments(response.data);

      } catch (error) {

        console.error(
          "Error loading recruitments",
          error
        );

      }

    };

    loadRecruitments();

  }, []);

  return (

    <div className="recruitments-page">

      <h1 className="recruitments-title">
        Club Recruitments
      </h1>

      <p className="recruitments-subtitle">

        Explore available opportunities and
        become part of campus communities.

      </p>

      <div className="recruitments-container">

        {recruitments.map((recruitment) => (

          <div
            key={recruitment.id}
            className="recruitment-card"
          >

            <div className="badge technical">
              {recruitment.category}
            </div>

            <h2>
              {recruitment.role}
            </h2>

            <h3>
              {recruitment.clubName}
            </h3>

            <p>
              {recruitment.description}
            </p>

            <div className="details">

              <span>
                📅 Deadline:
                {" "}
                {recruitment.deadline}
              </span>

              <span>
                👥 Team:
                {" "}
                {recruitment.team}
              </span>

            </div>

            <button
              onClick={() =>
                navigate(
                  `/dashboard/apply/${recruitment.id}`
                )
              }
            >
              Apply Now
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Recruitments;
