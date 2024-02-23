import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DeleteNote.css'; // Stil dosyasını burada içe aktar

function DeleteNotePage() {
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    deleteMission();
  }, []);

  const deleteMission = async () => {
    try {
      const response = await fetch(`http://localhost:7017/api/missions/${id}`, { // Backend API'nizin URL'sini buraya ekleyin
        method: 'DELETE',
      });
      if (response.ok) {
        history.push('/');
      } else {
        console.error('Failed to delete mission:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  };

  return <div className="delete-confirm">Deleting...</div>; {/* delete-confirm sınıfını kullanın */}
}

export default DeleteNotePage;
