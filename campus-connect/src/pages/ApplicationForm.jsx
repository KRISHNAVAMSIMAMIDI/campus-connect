import {
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import "./ApplicationForm.css";

import {
  submitApplication
} from "../services/api";

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

      await submitApplication({

        recruitmentId:
          Number(id),

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

      });

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