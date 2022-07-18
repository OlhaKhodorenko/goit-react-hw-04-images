import { Component } from 'react';
import Button from './Button/button';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Searchbar } from './Searchbar/searchbar';
import * as API from '../service/api.js';
import Loader from './Loader/loader';
import { Modal } from './Modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    search: '',
    images: [],
    isLoading: false,
    page: 1,
    total: null,
    tags: '',
    status: 'idle',
    fullImage: null,
    isOpen: false,
    modal: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.addImages();
    }
  }
  addImages = async () => {
    const { search, page } = this.state;
    this.setState({ isLoading: true });
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
      this.setState(prevState => ({
        images: [...prevState.images, ...addedImages],
        total: Images.totalHits,
      }));
    } catch (error) {
      console.log({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  changeSearchQuery = ({ search }) => {
    this.setState({ search, images: [], page: 1 });
  };
  toggleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };
  onImgClick = (fullImage, tags) => {
    this.setState({ fullImage, tags });
    this.toggleModal();
  };
  render() {
    const { images, isLoading, total, tags, isOpen, fullImage } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.changeSearchQuery} />
        <ToastContainer autoClose={2000} />
        {isLoading && <Loader />}

        {images.length > 0 && (
          <ImageGallery items={images} onClick={this.onImgClick}></ImageGallery>
        )}

        {isOpen && (
          <Modal onClose={this.toggleModal} fullImage={fullImage} tags={tags} />
        )}
        {images.length > 0 && images.length < total && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}
