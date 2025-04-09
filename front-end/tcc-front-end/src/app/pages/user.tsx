// pages/PageUser.tsx
import ButtonRequest from "../components/button_request";

export default function PageUser() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Página de Usuários</h1>
      <ButtonRequest show_text="Buscar Usuários" type_req="/user" />
    </div>
  );
}
