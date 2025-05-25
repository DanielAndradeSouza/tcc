import styled from "styled-components";

export const Overlay = styled.div`
    position:fixed;
    top:0;
    left:0;
    width: 100vw;
    height:100vh;
    background-color:rgba(0,0,0,0.5);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:1000;
`;
export const ModalContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: red;
  }
`