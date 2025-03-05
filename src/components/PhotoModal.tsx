import React from 'react';
import { Photo } from '../types';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Image,
} from './PhotoModal.styles';

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
