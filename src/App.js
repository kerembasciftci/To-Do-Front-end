import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddNotePage from './CrudPages/Add/AddNotePage';
import EditNotePage from './CrudPages/Update/EditNotePage';
import DeleteNotePage from './CrudPages/Delete/DeleteNotePage';
import NoteListPage from './CrudPages/List/NoteListPage';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:7017/api/Missions');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:7017/api/Missions/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchNotes();
      } else {
        console.error('Failed to delete note:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteListPage notes={notes || []} handleDeleteNote={handleDeleteNote} />} />
        <Route path="/add" element={<AddNotePage fetchNotes={fetchNotes} />} />
        <Route path="/edit/:id" element={<EditNotePage />} />
        <Route path="/delete/:id" element={<DeleteNotePage />} />
      </Routes>
    </Router>
  );
}

export default App;
