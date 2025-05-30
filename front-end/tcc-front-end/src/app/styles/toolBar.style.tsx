
import styled from "styled-components";

export const ImageList = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  list-style: none;
  padding: 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 100vh;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.8);
  border-left: 1px solid #ccc;
`;

export const ImageItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    object-fit: cover;
    border: 1px solid #ccc;
    width: 100px;
    height: 100px;
  }

  p {
    margin: 4px 0 0;
    font-size: 12px;
    text-align: center;
    word-break: break-all;
  }
`;
export const Title = styled.h3`
  margin: 0 0 10px;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  color: #333;
`;