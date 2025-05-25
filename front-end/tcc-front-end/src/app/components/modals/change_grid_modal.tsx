import { useEffect, useState } from "react";
import ButtonRequest from "../button_request";
import { CloseButton, ModalContainer, Overlay } from "@/app/styles/modal.style";

export default function ChangeGridModal(modalInfo: SceneModalInfo) {
  const [width, setWidth] = useState<number>(modalInfo.scene.width);
  const [height, setHeight] = useState<number>(modalInfo.scene.height);

  useEffect(() => {
    setWidth(modalInfo.scene.width);
    setHeight(modalInfo.scene.height);
  }, [modalInfo.scene]);

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={modalInfo.onClose}>✖</CloseButton>
        <h2>Redimensionar Cena</h2>

        <label htmlFor="width">Largura:</label>
        <input
          type="number"
          id="width"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />

        <label htmlFor="height">Altura:</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />

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
        </ModalContainer>
    </Overlay>
  );
}
