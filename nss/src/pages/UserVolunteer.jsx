import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/UserVolunteer.css';
import front1 from '../assert/front1.jpg';
import front2 from '../assert/front2.jpg';
import front3 from '../assert/front3.jpg';
import front4 from '../assert/front4.jpg';
import front5 from '../assert/front5.jpg';
import front6 from '../assert/front6.jpg';
import front7 from '../assert/front7.jpg';

function UserVolunteer() {
  const [activityDetails, setActivityDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [volId, setVolId] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [front1, front2, front3, front4, front5, front6, front7];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    axios.get('http://localhost:27000/admin/Activity')
      .then(response => {
        setActivityDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:27000/user/register/', { vol_id: volId, user_name: userName });
      console.log(response.data); // Assuming the backend responds with a success message
      setRegistrationStatus('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      setRegistrationStatus('Registration failed. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <header className="header">
        <div className="header-left">NSS Volunteer APP</div>
        <div className="header-right">
          <Link to="#volunteer-form">SERVICES</Link>
          <Link to="#Student_Register">Student Register</Link>
          <a href='#uservolreg'>Volunteer Registration</a>
        </div>
      </header>
      <br /><br />
      
      <div className="content-container">
        <div className="content-left">
          <h2>Services Provided</h2>
          <div className="image-container">
            <img src={images[currentImageIndex]} alt={`Front${currentImageIndex + 1}`} />
          </div>
          <div className='service-content'>
          <h3>Eye Camp</h3>
          <p>Eye camps are often conducted in collaboration with eye care professionals, NGOs, and local healthcare providers. They are typically held in rural or remote areas where access to eye care services is limited. Along with screenings and distribution of glasses, these camps may also include eye health education sessions to promote preventive care practices.</p>
          <h3>Campus Cleaning</h3>
          <p>Campus cleaning activities promote a sense of responsibility towards the environment and instill values of cleanliness among students and staff. These activities often involve organizing cleanup drives, segregating waste, and promoting recycling and sustainable practices.</p>
          <h3>Blood Donation Camp</h3>
          <p>Blood donation camps are crucial for maintaining an adequate supply of blood for medical emergencies. They are organized by blood banks, hospitals, and non-profit organizations. These camps ensure that safe blood is available for transfusions, surgeries, and treatments for patients in need.</p>
          <h3>Awareness Program</h3>
          <p>Awareness programs aim to educate communities about important issues. They may include workshops, seminars, and campaigns to raise awareness about health, safety, environmental conservation, and social issues. These programs empower individuals to make informed decisions and take positive actions.</p>
          <h3>Aadhar Correction Camp</h3>
          <p>Aadhar correction camps provide a convenient way for individuals to update their Aadhar card details. These camps may require documents such as proof of address, identity, or date of birth for corrections. They help individuals maintain accurate and up-to-date Aadhar records.</p>
          <h3>Passport and PAN Card Camp</h3>
          <p>Passport and PAN card camps simplify the application process for these essential documents. They provide a one-stop solution for individuals seeking to apply for or update their passport or PAN card. These camps ensure that applicants receive guidance and assistance throughout the application process.</p>
          </div>
          
        </div>

        <div className="content-right">
          <div className="activity-details">
            <h2>Activity Details</h2>
            <div className="table-container center-table">
              <table className="user-table">
                <thead>
                  <tr className="heading">
                    <th>Volunteer ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Location</th>
                    <th>Activity</th>
                    <th>Available Slots</th>
                  </tr>
                </thead>
                <tbody>
                  {activityDetails.map((data) => (
                    <tr key={data.vol_id}>
                      <td>{data.vol_id}</td>
                      <td>{data.startDate}</td>
                      <td>{data.endDate}</td>
                      <td>{data.location}</td>
                      <td>{data.activity}</td>
                      <td>{data.slot_available}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="registration-container" id="uservolreg">
            <h2>Registration for Activity</h2>
            <div className="registration-form">
              <label>
                Enter your name:
                <input type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </label>
              <label>
                Enter volunteer ID:
                <input type="text" placeholder="Volunteer ID" value={volId} onChange={(e) => setVolId(e.target.value)} />
              </label>
              <button onClick={handleRegistration}>Register</button>
              {registrationStatus && <p>{registrationStatus}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserVolunteer;
