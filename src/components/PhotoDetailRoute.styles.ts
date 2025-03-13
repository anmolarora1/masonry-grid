import styled from 'styled-components';

export const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  color: #333;
  font-size: 1.1rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  width: 400px;
`;
