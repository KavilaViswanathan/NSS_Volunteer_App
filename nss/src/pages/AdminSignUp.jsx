import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import '../styles/AdminSignup.css'
// import '../styles/Header.css'

const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    admin_name: "",
    admin_dept: "",
    admin_email: "",
    admin_phoneNum: "",
    admin_password: "",
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
      .post("http://localhost:27000/admin/signup", formData)
      .then((response) => {
        alert("Signup successful");
        navigate('/uservolunteer'); // Navigate to the volunteerActivity page
      })
      .catch((error) => {
        alert("Signup failed. Please try again.");
        console.error(error);
      });
  };

  return (
    <div>
      <header className="header">NSS Volunteer</header>
      <div  className="admin-signup-container">
      <form onSubmit={handleSubmit}>
      <h2>SignUp Form</h2>
        Name
        <input
          type="text"
          name="admin_name"
          value={formData.admin_name}
          onChange={handleChange}
          required
        />
        Department
        <input
          type="text"
          name="admin_dept"
          value={formData.admin_dept}
          onChange={handleChange}
          required
        />
        Email
        <input
          type="email"
          name="admin_email"
          value={formData.admin_email}
          onChange={handleChange}
          required
        />
        Phone Number
        <input
          type="tel"
          name="admin_phoneNum"
          value={formData.admin_phoneNum}
          onChange={handleChange}
          required
        />
        Password
        <input
          type="password"
          name="admin_password"
          value={formData.admin_password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      </div>
      </div>
  );
};

export default AdminSignUp;
