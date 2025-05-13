type ConfirmModal = {
    isOpen:boolean;
    onClose:() =>  boolean;
    onConfirm: () => boolean;
    title?:string;
    message:string;
}