import styled from 'styled-components';

export const Container = styled.div`
  padding: clamp(1rem, 4vw, 2rem);
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const BackButton = styled.button`
  background: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  background: #f8f8f8;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex: 1;
    max-width: 60%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  display: block;
  object-fit: contain;
  background: #f8f8f8;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem);
  padding: clamp(1rem, 3vw, 1.5rem);
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    flex: 1;
    max-width: 40%;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  margin: 0;
  color: #1a1a1a;
  line-height: 1.4;
`;

export const Photographer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  a {
    color: #0066cc;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a4a4a;
  font-size: 1rem;
`;

export const ColorSwatch = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${(props) => props.$color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const LoadingContainer = styled.div`
  padding: 4rem;
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  background: #f8f8f8;
  border-radius: 12px;
`;
