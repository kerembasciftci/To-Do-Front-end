import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css'; // Stil dosyasını burada içe aktar

function NoteListPage() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    try {
      const response = await fetch('http://localhost:7017/api/Missions'); // Backend API'nizin URL'sini buraya ekleyin
      const data = await response.json();
      setMissions(data);
    } catch (error) {
      console.error('Error fetching missions:', error);
    }
  };

  const handleDeleteMission = async (id) => {
    try {
      const response = await fetch(`http://localhost:7017/api/Missions/${id}`, { // Backend API'nizin URL'sini buraya ekleyin
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMissions();
      } else {
        console.error('Failed to delete mission:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  };

  return (
    <div className="note-list-page"> {/* note-list-page sınıfını kullanın */}
      <h1>Missions</h1>
      <ul>
        {missions.map((mission) => (
          <li key={mission.id}>
            <h3>{mission.name}</h3>
            <p>Description: {mission.description}</p>
            <p>Due Date: {mission.dueDate}</p>
            <p>Completed: {mission.isCompleted ? 'Yes' : 'No'}</p>
            <Link to={`/edit/${mission.id}`}>Edit</Link>{' '}
            <button onClick={() => handleDeleteMission(mission.id)}>Delete</button> {/* Sil butonunu ekleyin ve onClick olayını handleDeleteMission işlevine bağlayın */}
          </li>
        ))}
      </ul>
      <Link to="/add">Add New Mission</Link>
    </div>
  );
}

export default NoteListPage;
