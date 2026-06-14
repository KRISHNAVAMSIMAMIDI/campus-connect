import { useEffect, useState } from "react";

import { useParams }
from "react-router-dom";

import ClubProfileCard
from "../components/ClubProfileCard";

import {
  getClubById
}
from "../services/api";

function ClubProfile() {

  const { id } = useParams();

  const [club, setClub] =
    useState(null);

  useEffect(() => {

    const loadClub = async () => {

      try {

        const response =
          await getClubById(id);

        setClub(
          response.data
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

    loadClub();

  }, [id]);

  if (!club) {

    return (

      <div
        style={{
          padding: "40px",
          textAlign: "center"
        }}
      >

        <h2>
          Loading Club...
        </h2>

      </div>

    );

  }

  return (

    <div
      style={{
        background: "#FDFDFD",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >

      <ClubProfileCard
        club={club}
        isAdmin={false}
      />

    </div>

  );

}

export default ClubProfile;
