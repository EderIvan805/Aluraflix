import React from 'react';
import VideoCard from './VideoCard';
import './VideoList.css';

const VideoList = ({ videos, onEdit, onDelete }) => {
  const categories = {
    frontend: 'Front End',
    backend: 'Back End',
    innovation: 'Innovación y Gestión'
  };

  return (
    <div className="video-list">
      {Object.keys(categories).map((category) => (
        <div key={category} className="video-section">
          <h2 className={`section-title ${category}`}>{categories[category]}</h2>
          <div className="video-cards">
            {videos.filter(video => video.category === category).map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
