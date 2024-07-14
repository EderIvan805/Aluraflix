import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import VideoList from './components/VideoList';
import VideoForm from './components/VideoForm';
import EditModal from './components/EditModal';
import './App.css';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const response = await axios.get('http://localhost:5000/videos');
    setVideos(response.data);
  };

  const handleDeleteVideo = async (id) => {
    await axios.delete(`http://localhost:5000/videos/${id}`);
    setVideos(videos.filter((video) => video.id !== id));
  };

  const handleSaveVideo = async (video) => {
    try {
      if (video.id) {
        // Updating existing video
        const response = await axios.put(`http://localhost:5000/videos/${video.id}`, video);
        setVideos(videos.map((v) => (v.id === video.id ? response.data : v)));
      } else {
        // Creating new video
        const response = await axios.post('http://localhost:5000/videos', video);
        setVideos([...videos, response.data]);
      }
    } catch (error) {
      console.error('Error saving video:', error);
    }
    setIsModalOpen(false);
    navigate('/');
  };

  const handleEditVideo = (video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <header>
        <h1 className="logo">ALURAFIX</h1>
        <div className="header-buttons">
          <Link to="/" className="btn btn-secondary">Home</Link>
          <Link to="/nuevo-video" className="btn btn-primary">Nuevo Video</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<VideoList videos={videos} onDelete={handleDeleteVideo} onEdit={handleEditVideo} />} />
          <Route path="/nuevo-video" element={<VideoForm onSave={handleSaveVideo} onCancel={handleCancel} />} />
        </Routes>
      </main>
      <footer>
        <p>ALURAFIX</p>
      </footer>
      <EditModal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        video={currentVideo}
        onSave={handleSaveVideo}
      />
    </div>
  );
};

export default App;
