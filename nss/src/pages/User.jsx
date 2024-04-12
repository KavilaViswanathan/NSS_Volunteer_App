import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css'
import '../styles/Header.css'
import { Link } from 'react-router-dom';

function User() {
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !pwd) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return;
    }

    const url = `http://localhost:27000/user/signin/${encodeURIComponent(email)}/${encodeURIComponent(pwd)}`;
    axios
      .get(url)
      .then(function (response) {
        alert('Login successful');
        navigate('/uservolunteer');
      })
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else if (error.message) {
          alert(error.message);
        } else {
          alert('An error occurred. Please try again.');
        }
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      <header className="header">
        <div className="header-left">NSS Volunteer APP</div>
      </header>
      {/* <div className="nss-volunteer-box">
        {/* Add your NSS Volunteer content here */}
      {/* </div> */}
      <div className="login-form-box">
        <form onSubmit={handleSubmit}>
          <h2>LOGIN FORM</h2>
          <br />
          Email:
          <input
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />{' '}
          <br />
          Password:
          <input
            type="password"
            value={pwd}
            name="password"
            onChange={(e) => setPwd(e.target.value)}
          />{' '}
          <br />
          <input type="submit" value="Sign in" />
          <div className="signup-link">
         Don't have an account? <Link to="/usersignup">SignUp</Link>
           </div>
          </form>
      </div>
    </div>
  );
}

export default User;
