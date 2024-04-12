import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import XLSX as an object containing all exports
import '../styles/VolunteerActivity.css';

const VolunteerActivity = () => {
  const [formData, setFormData] = useState({
    vol_id: '',
    startDate: '',
    endDate: '',
    location: '',
    activity: '',
    slot_available: '',
  });

  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:27000/admin/ActivityRegister')
      .then((response) => {
        setRegistrations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
      .post('http://localhost:27000/admin/insertActivity', formData)
      .then((response) => {
        alert('Volunteer information submitted successfully');
        setFormData({
          vol_id: '',
          startDate: '',
          endDate: '',
          location: '',
          activity: '',
          slot_available: '',
        });
      })
      .catch((error) => {
        let errorMessage = 'Failed to submit volunteer information. Please try again.';
        if (error.response && error.response.status === 400) {
          errorMessage = error.response.data.message;
        }
        alert(errorMessage);
        console.error(error);
      });
  };

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const data = registrations.reduce((acc, reg) => {
      if (!acc[reg.vol_id]) {
        acc[reg.vol_id] = [];
      }
      acc[reg.vol_id].push(reg.user_name);
      return acc;
    }, {});

    Object.entries(data).forEach(([vol_id, names]) => {
      const worksheet = XLSX.utils.aoa_to_sheet([['Volunteer ID', 'Student Name'], ...names.map(name => [vol_id, name])]);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Volunteer ${vol_id}`);
    });

    XLSX.writeFile(workbook, 'student_names.xlsx');
  };
  return (
    <div>
      <header className="header">
        <div className="header-left">NSS Volunteer APP</div>
        <div className="header-right">
          <a href="#volunteer-form">Activity Registration</a>
          <a href="#Student_Register">Student Register</a>
          <Link to="/updated">Update</Link>
          <Link to="/">LogOut</Link>
        </div>
      </header>
      <div className="container" id="volunteer-form">
        <br />
        <h2>Volunteer Form</h2>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <label>
              Volunteer ID:
              <input
                type="text"
                name="vol_id"
                value={formData.vol_id}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Start Date:
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Activity:
              <input
                type="text"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Slots Available:
              <input
                type="number"
                name="slot_available"
                value={formData.slot_available}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="container" id="Student_Register">
        <h2>Registered Students</h2>
        <button onClick={handleDownload}>Download Excel</button>
        <table>
          <thead>
            <tr>
              <th>Volunteer ID</th>
              <th>Total Students Registered</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(registrations.reduce((acc, reg) => {
              if (!acc[reg.vol_id]) {
                acc[reg.vol_id] = 1;
              } else {
                acc[reg.vol_id]++;
              }
              return acc;
            }, {})).map(([vol_id, count]) => (
              <tr key={vol_id}>
                <td>{vol_id}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default VolunteerActivity;
