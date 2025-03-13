import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Photo } from '../types';
import { PhotoModal } from './PhotoModal';
import { pexelsService } from '../services/pexelsApi';
import { OverlayContainer, ErrorMessage } from './PhotoDetailRoute.styles';

export const PhotoDetailRoute: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const photoId = searchParams.get('photo');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (photoId) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [photoId]);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!photoId) return;

      // First try to get photo from router state
      const statePhoto = location.state?.photo as Photo | undefined;
      if (statePhoto) {
        setPhoto(statePhoto);
        return;
      }

      // If not in state, fetch from API
      setLoading(true);
      setError(null);
      try {
        const fetchedPhoto = await pexelsService.getPhoto(photoId);
        setPhoto(fetchedPhoto);
      } catch (error) {
        console.error('Error fetching photo:', error);
        setError('Failed to load photo. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [photoId, location.state]);

  const handleClose = () => {
    const params = new URLSearchParams(location.search);
    params.delete('photo');
    navigate(`/?${params.toString()}`, { replace: true });
  };

  if (!photoId) {
    return null;
  }

  if (loading) {
    return (
      <OverlayContainer>
        <ErrorMessage>Loading photo...</ErrorMessage>
      </OverlayContainer>
    );
  }

  if (error || !photo) {
    return (
      <OverlayContainer>
        <ErrorMessage>
          {error || 'Photo not found'}
          <br />
          <button
            onClick={handleClose}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              background: '#0066cc',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </ErrorMessage>
      </OverlayContainer>
    );
  }

  return (
    <OverlayContainer>
      <PhotoModal photo={photo} onClose={handleClose} />
    </OverlayContainer>
  );
};
