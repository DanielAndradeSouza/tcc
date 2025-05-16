import { useState } from "react";
import ButtonRequest from "../button_request";

export default function ChangeGridModal(modalInfo: SceneModalInfo) {
  const [width, setWidth] = useState<number>(modalInfo.scene.width);
  const [height, setHeight] = useState<number>(modalInfo.scene.height); // <- Corrigido aqui também, antes estava pegando o width duas vezes

  return (
    <div>
      <label htmlFor="width">Largura:</label>
      <input type="number" id="width" value={width}onChange={(e) => setWidth(Number(e.target.value))}/>

      <label htmlFor="height">Altura:</label>
      <input type="number"id="height"value={height}onChange={(e) => setHeight(Number(e.target.value))}/>

      <ButtonRequest
        show_text="Redimensionar Cena"
        url={`scene/${modalInfo.scene.id}`}
        header={{
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ width, height }),
          headers:{
            'Content-Type':'application/json'
          }
        }}
        onSuccess={() => alert("Cena redimensionada com sucesso!")}
        onError={() => alert("Erro ao redimensionar a cena")}
      />
    </div>
  );
}
