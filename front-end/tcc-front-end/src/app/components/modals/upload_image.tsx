import { useState } from "react";
import ButtonRequest from "../button_request";
import { ModalButton, ModalContent, ModalOverlay } from "@/app/styles/modal.style";

interface UploadImageProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?:() => void;
}

export function UploadImage({ isOpen, onClose,onUploadComplete }: UploadImageProps) {
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
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalButton onClick={onClose}>✖</ModalButton>

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
              onUploadComplete?.();
              onClose();
            }}
            onError={() => alert("Erro ao enviar a imagem")}
          />
        ) : (
          <button disabled>Enviar Imagem</button>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}
