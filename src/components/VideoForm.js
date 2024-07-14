import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './VideoForm.css';

const VideoForm = ({ onSave, onCancel }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/videos/${id}`).then((response) => {
        const { title, category, image, video, description } = response.data;
        setTitle(title);
        setCategory(category);
        setImage(image);
        setVideoUrl(video);
        setDescription(description);
      });
    }
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newVideo = { title, category, image, video: videoUrl, description };
    try {
      if (id) {
        await axios.put(`http://localhost:5000/videos/${id}`, newVideo);
      } else {
        await axios.post('http://localhost:5000/videos', newVideo);
      }
      onSave(newVideo);
      navigate('/');
    } catch (error) {
      console.error('Error saving video:', error);
    }
  };

  onCancel = () => {
    navigate('/');
  };

  return (
    <div className="video-form-container">
      <h2>{id ? 'Editar Video' : 'Nuevo Video'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="frontend">Front End</option>
            <option value="backend">Back End</option>
            <option value="innovation">Innovación y Gestión</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <img src={image} alt="Preview" className="image-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="video">Video</label>
          <input
            type="url"
            id="video"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
