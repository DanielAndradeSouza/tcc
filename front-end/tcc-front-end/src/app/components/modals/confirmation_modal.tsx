export default function ConfirmationModal(modalInfo:ConfirmationModalInfo) {
  if (!modalInfo.isOpen) return null

  return (
    <div>
      <div>
        <h2>{modalInfo.title || 'Confirmar ação'}</h2>
        <p>{modalInfo.message || 'Tem certeza que deseja continuar?'}</p>
        <div>
          <button onClick={modalInfo.onClose}>Cancelar</button>
          <button
            onClick={() => {
              modalInfo.onConfirm()
              modalInfo.onClose()
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
