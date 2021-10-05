import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 768px;
`;

export const BooksList = styled.div`
  margin-top: 80px;
  max-width: 768px;
  width: 100%;
`;

export const BookItem = styled.div`
  &:hover {
    transform: translateX(10px);
  }

  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: block;
  text-decoration: none;

  display: flex;
  align-items: center;
  transition: transform 0.2s;

  & + div {
    margin-top: 16px;
  }

  svg {
    margin-left: 8px;
    color: #cbcbd6;
    cursor: pointer;
  }
`;

export const BookContent = styled.div`
  margin: 0 16px;
  flex: 1;
  display: block;
  flex-direction: column;
  align-items: flex-start;

  strong {
    font-size: 20px;
    color: #3d3d4d;
  }

  p {
    font-size: 18px;
    color: #a8a8b3;
    margin-top: 4px;
  }
`;
