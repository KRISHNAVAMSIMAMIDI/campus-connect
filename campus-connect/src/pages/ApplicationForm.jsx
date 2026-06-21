import {
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import "./ApplicationForm.css";

import {
  getAllRecruitments,
  submitApplication
} from "../services/api";

const normalizeArray = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (payload.data) return normalizeArray(payload.data);
  if (payload.items) return normalizeArray(payload.items);
  if (payload.recruitments) return normalizeArray(payload.recruitments);
  return [];
};

const getRecordId = (record) => (
  record?.id ??
  record?._id ??
  record?.recruitmentId ??
  record?.recruitment_id ??
  null
);

const getRecruitmentClubId = (recruitment) => (
  recruitment?.clubId ??
  recruitment?.club_id ??
  recruitment?.club?.id ??
  recruitment?.club?._id ??
  null
);

const getRecruitmentClubName = (recruitment) => (
  recruitment?.clubName ??
  recruitment?.club_name ??
  recruitment?.club?.name ??
  recruitment?.club?.clubName ??
  ""
);

const storeClubApplication = (clubId, application) => {
  if (!clubId) return;

  try {
    const storageKey = `clubApplications:${clubId}`;
    const existing = normalizeArray(
      JSON.parse(localStorage.getItem(storageKey))
    );
    localStorage.setItem(
      storageKey,
      JSON.stringify([application, ...existing])
    );
  } catch (error) {
    console.warn("Unable to store application locally", error);
  }
};

function ApplicationForm() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      studentName: "",

      email: "",

      department: "",

      year: "",

      reason: ""

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      const recruitmentId =
        Number.isNaN(Number(id))
          ? id
          : Number(id);

      const recruitmentsResponse = await getAllRecruitments();
      const recruitment = normalizeArray(recruitmentsResponse.data)
        .find((item) =>
          String(getRecordId(item)) === String(recruitmentId)
        );

      const clubId = getRecruitmentClubId(recruitment);
      const clubName = getRecruitmentClubName(recruitment);

      const applicationPayload = {

        recruitmentId:
          recruitmentId,

        clubId,

        clubName,

        userId:
          user?.id,

        studentName:
          formData.studentName,

        email:
          formData.email,

        department:
          formData.department,

        year:
          formData.year,

        reason:
          formData.reason,

        status:
          "PENDING"

      };

      const response = await submitApplication(applicationPayload);

      storeClubApplication(
        clubId,
        {
          id:
            response.data?.id ??
            response.data?._id ??
            `local-${Date.now()}`,
          ...applicationPayload,
          ...response.data,
        }
      );

      alert(
        "Application Submitted Successfully"
      );

      navigate(
        "/dashboard/recruitments"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Submit"
      );

    }

  };

  return (

    <div className="application-page">

      <form
        className="application-card"
        onSubmit={
          handleSubmit
        }
      >

        <h2 className="application-title">
          Application Form
        </h2>

        <input
          type="text"
          name="studentName"
          placeholder="Full Name"
          onChange={
            handleChange
          }
          required
        />

        <input
          type="email"
          name="email"
          placeholder="College Email"
          onChange={
            handleChange
          }
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          onChange={
            handleChange
          }
          required
        />

        <input
          type="text"
          name="year"
          placeholder="Year"
          onChange={
            handleChange
          }
          required
        />

        <textarea
          name="reason"
          placeholder="Why do you want to join?"
          onChange={
            handleChange
          }
          required
        />

        <button
          type="submit"
        >
          Submit Application
        </button>

      </form>

    </div>

  );

}

export default ApplicationForm;
