import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/modal.css';

function DetailModal({ item, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {item.image && (
          <div className="modal-image-wrap">
            <img src={item.image} alt={item.cardTitle} className="modal-image" />
          </div>
        )}
        <div className="modal-body">
          <span className="modal-date">{item.title}</span>
          <h2 className="modal-title">{item.cardTitle}</h2>
          {item.cardSubtitle && (
            <p className="modal-subtitle">{item.cardSubtitle}</p>
          )}
          {item.cardDetailedText && (
            <div className="modal-detail">{item.cardDetailedText}</div>
          )}
          {item.description && (
            <div className="modal-description">{item.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}

DetailModal.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    cardTitle: PropTypes.string,
    cardSubtitle: PropTypes.string,
    cardDetailedText: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DetailModal;