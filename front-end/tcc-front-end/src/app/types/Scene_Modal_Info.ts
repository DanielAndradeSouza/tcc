type SceneModalInfo = {
    scene:Scene;
    isOpen:boolean;
    onClose:() => void;
    onUpdate:(width:number,height:number) => void;
}