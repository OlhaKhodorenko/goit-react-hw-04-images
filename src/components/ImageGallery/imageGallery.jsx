import { ImageGalleryItem } from '../ImageGalleryItem/imageGalleryItem';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {items.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            src={item.webformatURL}
            tags={item.tags}
            webformatURL={item.webformatURL}
            largeImageURL={item.largeImageURL}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
};
