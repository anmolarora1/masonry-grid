import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Photo } from '../types';
import { PhotoDetail } from './PhotoDetail';
import { pexelsService } from '../services/pexelsApi';

export const PhotoDetailRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!id) return;

      // First try to get photo from router state
      const statePhoto = location.state?.photo as Photo | undefined;
      if (statePhoto) {
        setPhoto(statePhoto);
        return;
      }

      // If not in state, fetch from API
      setLoading(true);
      try {
        const fetchedPhoto = await pexelsService.getPhoto(id);
        setPhoto(fetchedPhoto);
      } catch (error) {
        console.error('Error fetching photo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id, location.state]);

  const handleBack = () => {
    navigate('/', { replace: true });
  };

  if (!id) {
    return <div>No photo ID provided</div>;
  }

  if (loading) {
    return <div>Loading photo...</div>;
  }

  if (!photo) {
    return <div>Photo not found</div>;
  }

  return <PhotoDetail photo={photo} onBack={handleBack} />;
};
