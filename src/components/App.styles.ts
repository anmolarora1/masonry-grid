import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

export const SearchContainer = styled.div`
  padding: 1rem;
  position: sticky;
  top: 0;
  background: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;
