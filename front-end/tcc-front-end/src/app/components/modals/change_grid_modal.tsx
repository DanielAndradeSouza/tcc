import { useState } from "react";
import ButtonRequest from "../button_request";
//Eu to basicamente dizendo que o props scene vai receber uma varíavel scene, do tipo scene kkkkkkk wtf
export default function ChangeGridModal(modalInfo:SceneModalInfo){
    const [width,setWidth] = useState<number>(modalInfo.scene.width);
    const [height,setHeight] = useState<number>(modalInfo.scene.width);
    return (
        <div>
            <label htmlFor="width"></label>
            <input type="number" id="width" value={modalInfo.scene.width} onChange={(e) => setWidth(Number(e.target.value))} />
            <label htmlFor="height"></label>
            <input type="number" id="height" value={modalInfo.scene.height} onChange={(e) => setHeight(Number(e.target.value))} />
            <ButtonRequest 
            show_text="Redimencionar Cena" 
            url={`scene/${modalInfo.scene.id}`} 
            header={{method:'PATCH',credentials:'include',body:JSON.stringify(modalInfo.scene)}}>
            </ButtonRequest>
        </div>
    )
}