import css from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  onClick,
  id,
  tags,
  webformatURL,
  largeImageURL,
}) => {
  return (
    <li
      onClick={() => {
        onClick(largeImageURL);
      }}
    >
      <img
        key={id}
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
