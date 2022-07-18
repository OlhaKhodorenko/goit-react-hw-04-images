import { Component } from 'react';
import css from './modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { fullImage, tags } = this.props;
    return (
      <div className={css.Overlay} onClick={this.onOverlayClick}>
        <div className={css.Modal}>
          <img
            className={css.ImageGalleryItemImage}
            src={fullImage}
            alt={tags}
          />
        </div>
      </div>
    );
  }
}
