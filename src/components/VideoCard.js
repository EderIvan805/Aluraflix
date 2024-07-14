import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './VideoCard.css';

const VideoCard = ({ video, onEdit, onDelete }) => {
  const categoryColors = {
    frontend: '#00BFFF',
    backend: '#32CD32',
    innovation: '#FFD700'
  };

  return (
    <div className="video-card" style={{ borderColor: categoryColors[video.category] }}>
      <div className="video-image-container">
      <img src={video.image} alt={video.title} className="video-image" />
        <div className="video-card-content">
          <h3>{video.title}</h3>
          <p className="category" style={{ color: categoryColors[video.category] }}>{video.category}</p>
          <p className="description">{video.description}</p>
        </div>
      </div>
      <div className="video-card-buttons">
        <button onClick={() => onEdit(video)}>
          <FaEdit /> Editar
        </button>
        <button onClick={() => onDelete(video.id)}>
          <FaTrash /> Borrar
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
