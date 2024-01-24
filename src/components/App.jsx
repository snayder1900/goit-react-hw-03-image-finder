import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from './SearchBar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${encodeURIComponent(
            searchQuery
          )}&page=${currentPage}&key=41450902-02a3f48b34ed507e6f3e0e497&image_type=photo&orientation=horizontal&per_page=12`
        );
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, currentPage]);

  const handleSearchSubmit = query => {
    setImages([]);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const openModal = imageUrl => {
    setShowModal(true);
    setLargeImageURL(imageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && !isLoading && <Button onClick={loadMore} />}
      {showModal && (
        <Modal src={largeImageURL} alt={searchQuery} onClose={closeModal} />
      )}
    </div>
  );
};
