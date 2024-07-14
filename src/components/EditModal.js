import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditModal.css';

Modal.setAppElement('#root');

const EditModal = ({ isOpen, onRequestClose, video, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setCategory(video.category);
      setImage(video.image);
      setVideoUrl(video.video);
      setDescription(video.description);
    }
  }, [video]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedVideo = { ...video, title, category, image, video: videoUrl, description };
    onSave(updatedVideo);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="edit-modal" overlayClassName="edit-modal-overlay">
      <h2>Editar Card</h2>
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
          <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
