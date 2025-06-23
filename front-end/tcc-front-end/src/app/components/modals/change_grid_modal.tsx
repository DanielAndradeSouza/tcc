import { useEffect, useState } from "react";
import ButtonRequest from "../button_request";
import {
  ModalButton,
  ModalContent,
  ModalOverlay,
} from "@/app/styles/modal.style";
import styled from "styled-components";

export default function ChangeGridModal(modalInfo: SceneModalInfo) {
  const [width, setWidth] = useState<number>(modalInfo.scene.width);
  const [height, setHeight] = useState<number>(modalInfo.scene.height);

  useEffect(() => {
    setWidth(modalInfo.scene.width);
    setHeight(modalInfo.scene.height);
  }, [modalInfo.scene]);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalButton onClick={modalInfo.onClose}>✖</ModalButton>
        <Title>Redimensionar Cena</Title>

        <FormGroup>
          <Label htmlFor="width">Largura:</Label>
          <NumberInput
            type="number"
            id="width"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            min={1}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="height">Altura:</Label>
          <NumberInput
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            min={1}
          />
        </FormGroup>

        <ButtonWrapper>
          <ButtonRequest
            show_text="Redimensionar Cena"
            url={`scene/${modalInfo.scene.id}`}
            header={{
              method: "PATCH",
              credentials: "include",
              body: JSON.stringify({ width, height }),
              headers: {
                "Content-Type": "application/json",
              },
            }}
            onSuccess={() => {
              modalInfo.onUpdate(width, height);
              modalInfo.onClose();
            }}
            onError={() => alert("Erro ao redimensionar a cena")}
          />
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

// Styled-components para o modal inputs e labels

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color:rgb(223, 226, 235);
  font-weight: 700;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color:rgb(237, 242, 248); /* cinza escuro */
`;

const NumberInput = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1.5px solid #d1d5db;
  font-size: 1rem;
  outline-offset: 2px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3b82f6; /* azul */
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;
