import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import '../styles/AdminSignup.css'

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    user_rollno:"",
    user_name:"",
    user_dept:"",
    user_year:"",
    user_email:"",
    user_password: "",
  });
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:27000/user/signup", formData)
      .then((response) => {
        alert("Signup successful");
        navigate('/ActivityVolunteer'); // Navigate to the volunteerActivity page
      })
      .catch((error) => {
        alert("Signup failed. Please try again.");
        console.error(error);
      });
  };

  return (
    <div>
      <header className="header">NSS Volunteer</header>
      <div className="admin-signup-container">
        <form onSubmit={handleSubmit}>
          <h2>SignUp Form</h2>
          Roll no
          <input
            type="text"
            name="user_rollno"
            value={formData.user_rollno}
            onChange={handleChange}
            required
          />
          Name
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
          Department
          <input
            type="text"
            name="user_dept"
            value={formData.user_dept}
            onChange={handleChange}
            required
          />
          Year
          <select
              name="user_year"
              value={formData.user_year}
              onChange={handleChange}
              required
          >
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
          </select>
          Email
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
          Password
          <input
            type="password"
            name="user_password"
            value={formData.user_password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default UserSignUp;
