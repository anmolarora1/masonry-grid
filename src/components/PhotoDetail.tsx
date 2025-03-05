import React from 'react';
import { Photo } from '../types';
import {
  Container,
  BackButton,
  Image,
  ImageContainer,
  InfoContainer,
  Photographer,
} from './PhotoDetail.styles';

interface PhotoDetailProps {
  photo: Photo;
  onBack: () => void;
}

export const PhotoDetail: React.FC<PhotoDetailProps> = ({ photo, onBack }) => {
  return (
    <Container>
      <BackButton onClick={onBack}>← Back</BackButton>
      <ImageContainer>
        <Image src={photo.src.large} alt={photo.alt || 'Photo'} />
      </ImageContainer>
      <InfoContainer>
        <Photographer>
          Photo by{' '}
          <a
            href={photo.photographer_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            {photo.photographer}
          </a>
        </Photographer>
      </InfoContainer>
    </Container>
  );
};
