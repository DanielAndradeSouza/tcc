import { BlueButton, GrayButton, ListButton, RedButton } from "@/app/styles/buttons.style";
import { Overlay, ModalContainer, CloseButton } from "@/app/styles/modal.style";

export default function ConfirmationModal(modalInfo: ConfirmationModalInfo) {
  if (!modalInfo.isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={modalInfo.onClose}>✖</CloseButton>

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
      </ModalContainer>
    </Overlay>
  );
}
