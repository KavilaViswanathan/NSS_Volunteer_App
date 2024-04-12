import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/UpdateDelete.css'; 

function UpdateDelete() {
  const [volId, setVolId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [activity, setActivity] = useState('');
  const [slotAvailable, setSlotAvailable] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:27000/admin/updatetActivity/${volId}`, {
        startDate,
        endDate,
        location,
        activity,
        slot_available: slotAvailable
      });
      alert('Volunteer updated successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:27000/admin/deleteVol/${volId}`);
      alert('Volunteer deleted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <header className="header">
        <div className="header-left">NSS Volunteer APP</div>
        <div className="header-right">
          <Link to="/">LogOut</Link>
        </div>
      </header>
      <br /><br />
      <div className="container">
    <div className="update-delete-container"> 
      <h2>Update or Delete Volunteer</h2>
      <div className="input-group">
        <label>Volunteer ID:</label>
        <input
          type="text"
          value={volId}
          onChange={(e) => setVolId(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </div>
      <div className="input-group">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </div>
      <div className="input-group">
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Activity:</label>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Slots Available:</label>
        <input
          type="text"
          value={slotAvailable}
          onChange={(e) => setSlotAvailable(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button onClick={handleUpdate}>Update Volunteer</button>
        <button onClick={handleDelete}>Delete Volunteer</button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default UpdateDelete;
