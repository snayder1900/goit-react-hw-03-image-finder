
export const ImageGalleryItem = ({ image, onClick }) => (
  <li className="gallery-item" onClick={() => onClick(image.largeImageURL)}>
    <img className='gallery-item__img' src={image.webformatURL} alt="" />
  </li>
);

