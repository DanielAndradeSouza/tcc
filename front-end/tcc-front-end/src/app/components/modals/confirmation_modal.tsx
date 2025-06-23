import { BlueButton, GrayButton, ListButton, RedButton } from "@/app/styles/buttons.style";
import { ModalButton, ModalContent, ModalOverlay } from "@/app/styles/modal.style";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  message = "Tem certeza que deseja continuar?",
}: ConfirmationModalInfo) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalButton onClick={onClose}>✖</ModalButton>

        <h2>{title}</h2>
        <p>{message}</p>

        <ListButton>
          <GrayButton onClick={onClose}>Cancelar</GrayButton>
          <RedButton
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirmar
          </RedButton>
        </ListButton>
      </ModalContent>
    </ModalOverlay>
  );
}
