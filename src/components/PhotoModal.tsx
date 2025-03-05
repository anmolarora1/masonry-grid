import React from 'react';
import styled from 'styled-components';
import { Photo } from '../types';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  padding: 20px;
  border-radius: 8px;
  overflow: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Image src={photo.src.large} alt={photo.alt || 'Photo'} />
        <h2>{photo.alt || 'Untitled'}</h2>
        <p>Photographer: {photo.photographer}</p>
        <p>Width: {photo.width}</p>
        <p>Height: {photo.height}</p>
      </ModalContent>
    </ModalOverlay>
  );
};
