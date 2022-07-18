import { useEffect } from 'react';
import css from './modal.module.css';

export const Modal = ({ fullImage, tags, onClose }) => {
  useEffect(() => {
    const handleClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [onClose]);

  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={onOverlayClick}>
      <div className={css.Modal}>
        <img className={css.ImageGalleryItemImage} src={fullImage} alt={tags} />
      </div>
    </div>
  );
};
