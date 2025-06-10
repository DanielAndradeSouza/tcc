'use client';

import { fetchData } from "@/app/services/api";
import React, { useState } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px 24px;
  border-radius: 8px;
  width: 320px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
`;

const Title = styled.h2`
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px 10px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background-color: #ccc;
  color: black;
  transition: background-color 0.2s;

  &:hover {
    background-color: #aaa;
  }
`;

type CreateSceneModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newScene: Scene) => void;
};

export default function CreateSceneModal({ isOpen, onClose, onCreated }: CreateSceneModalProps) {
  const [title, setTitle] = useState("");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Título é obrigatório");
      return;
    }
    if (width < 1 || height < 1) {
      setError("Largura e altura devem ser maiores que 0");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const tableId = localStorage.getItem("tableId");
      if (!tableId) throw new Error("tableId não encontrado");

      const newScene = await fetchData(`/table/${tableId}/scene`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, width, height }),
    });
    console.log(newScene);
    onCreated(newScene);
    onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>Criar Nova Cena</Title>

        {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}

        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nome da cena"
        />

        <Label htmlFor="width">Largura (número de células)</Label>
        <Input
          id="width"
          type="number"
          min={1}
          value={width}
          onChange={e => setWidth(Number(e.target.value))}
        />

        <Label htmlFor="height">Altura (número de células)</Label>
        <Input
          id="height"
          type="number"
          min={1}
          value={height}
          onChange={e => setHeight(Number(e.target.value))}
        />

        <ButtonsRow>
          <Button onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Criando..." : "Criar"}
          </Button>
        </ButtonsRow>
      </ModalContent>
    </ModalBackdrop>
  );
}
