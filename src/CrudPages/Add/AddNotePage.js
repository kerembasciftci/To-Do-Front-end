import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddNotePage.css'; // Stil dosyasını içe aktar

function AddNotePage() {
  const [note, setNote] = useState('');
  const history = useNavigate();

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:7017/api/Missions', { // Backend API'nizin URL'sini buraya ekleyin
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: note }), // Name alanı olarak notunuzu gönderiyorum
      });
      if (response.ok) {
        history.push('/');
      } else {
        console.error('Failed to add note:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="form-container"> {/* form-container sınıfını kullanın */}
      <h1>Not Ekle</h1>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleSave}>Ekle</button>
    </div>
  );
}

export default AddNotePage;
