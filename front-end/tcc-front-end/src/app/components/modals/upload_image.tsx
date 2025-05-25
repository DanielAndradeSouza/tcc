import { useState } from "react";
import ButtonRequest from "../button_request";
import { Overlay, ModalContainer, CloseButton } from "@/app/styles/modal.style";

interface UploadImageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadImage({ isOpen, onClose }: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [header, setHeader] = useState<RequestInit | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);

      setHeader({
        method: "POST",
        body: formData,
        credentials: "include",
      });
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✖</CloseButton>

        <h1>Upload de Token</h1>
        <input type="file" onChange={handleFileChange} />

        {header ? (
          <ButtonRequest
            show_text="Enviar Imagem"
            url={`/scene_images/${localStorage.getItem("sceneId") ?? ""}`}
            header={header}
            onSuccess={() => {
              alert("Imagem enviada com sucesso!");
              setFile(null);
              setHeader(null);
              onClose();
            }}
            onError={() => alert("Erro ao enviar a imagem")}
          />
        ) : (
          <button disabled>Enviar Imagem</button>
        )}
      </ModalContainer>
    </Overlay>
  );
}
