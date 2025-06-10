import { BlueButton, GrayButton, ListButton, RedButton } from "@/app/styles/buttons.style";
import { ModalButton, ModalContent, ModalOverlay } from "@/app/styles/modal.style";

export default function ConfirmationModal(modalInfo: ConfirmationModalInfo) {
  if (!modalInfo.isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalButton onClick={modalInfo.onClose}>✖</ModalButton>

        <h2>{modalInfo.title || "Confirmar ação"}</h2>
        <p>{modalInfo.message || "Tem certeza que deseja continuar?"}</p>

        <ListButton>
          <GrayButton
            onClick={modalInfo.onClose}
          >
            Cancelar
          </GrayButton>
          <RedButton
            onClick={() => {
              modalInfo.onConfirm();
              modalInfo.onClose();
            }}
          >
            Confirmar
          </RedButton>
        </ListButton>
      </ModalContent>
    </ModalOverlay>
  );
}
