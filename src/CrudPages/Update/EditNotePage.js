import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditNotePage.css'; // Stil dosyasını burada içe aktar

function EditNotePage() {
  const [mission, setMission] = useState({
    name: '',
    description: '',
    dueDate: '',
    isCompleted: false,
  });
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    fetchMission();
  }, []);

  const fetchMission = async () => {
    try {
      const response = await fetch(`http://localhost:7017/api/missions/${id}`); // Backend API'nizin URL'sini buraya ekleyin
      const data = await response.json();
      setMission(data);
    } catch (error) {
      console.error('Error fetching mission:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:7017/api/missions/${id}`, { // Backend API'nizin URL'sini buraya ekleyin
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mission),
      });
      if (response.ok) {
        history.push('/');
      } else {
        console.error('Failed to update mission:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating mission:', error);
    }
  };

  return (
    <div className="edit-form-container"> {/* edit-form-container sınıfını kullanın */}
      <h1>Edit Mission</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={mission.name}
          onChange={(e) => setMission({ ...mission, name: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={mission.description}
          onChange={(e) => setMission({ ...mission, description: e.target.value })}
          rows={5}
          cols={30}
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={mission.dueDate}
          onChange={(e) => setMission({ ...mission, dueDate: e.target.value })}
        />
      </div>
      <div>
        <label>Is Completed:</label>
        <input
          type="checkbox"
          checked={mission.isCompleted}
          onChange={(e) => setMission({ ...mission, isCompleted: e.target.checked })}
        />
      </div>
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditNotePage;
