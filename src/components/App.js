import { useState, useEffect } from 'react';
import Button from './Button/button';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Searchbar } from './Searchbar/searchbar';
import * as API from '../service/api.js';
import Loader from './Loader/loader';
import { Modal } from './Modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'formik';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [tags, setTags] = useState('');
  const [fullImage, setFullImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (search === '') {
      return;
    }
    setIsLoading(true);
    const addImages = async () => {
      try {
        const Images = await API.getImage(search, page);
        if (Images.total === 0) {
          toast.error('There is no images found');
        }
        const addedImages = Images.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );
        setImages(prevImages => [...prevImages, ...addedImages]);
        setTotal(Images.totalHits);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    };

    addImages();
  }, [search, page]);

  const changeSearchQuery = ({ search }) => {
    setSearch(search);
    setImages([]);
    setPage(1);
    return;
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = () => {
    setIsOpen(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onImgClick = (fullImage, tags) => {
    setFullImage(fullImage);
    setTags(tags);
    openModal();
  };

  return (
    <div className="App">
      <Searchbar onSubmit={changeSearchQuery} />
      <ToastContainer autoClose={2000} />
      {isLoading && <Loader />}

      {images.length > 0 && (
        <ImageGallery items={images} onClick={onImgClick}></ImageGallery>
      )}

      {isOpen && (
        <Modal onClose={closeModal} fullImage={fullImage} tags={tags} />
      )}
      {images.length > 0 && images.length < total && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};
