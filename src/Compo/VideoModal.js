// VideoModal.js

import React from 'react';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="video-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <video controls autoPlay>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
