// pages/PageUser.tsx
import ButtonRequest from "../../components/button_request";

export default function PageUser() {
  return (
    <div>
      <h1>Criar Conta</h1>
      <form action="/users/" method="POST">
      <div>
      <label htmlFor="username">Nome de Usuário</label>
      <input type="text" name="username" />
      </div>
      <div>
      <label htmlFor="email">Email</label>
      <input type="email" name="email"/>
      </div>
      <div>
      <label htmlFor="password">Senha</label>
      <input type="password" name="password" />
      </div>
      <div className="p-4">
      <ButtonRequest show_text="Buscar Usuários" type_req="/user" />
    </div>
      </form>
    </div>
  );
}
