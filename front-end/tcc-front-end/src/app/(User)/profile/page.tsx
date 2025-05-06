'use client'

import { useAuth } from "@/app/hooks/useAuth";
import ButtonRequest from "../../components/button_request";

export default function ProfilePage() {
  // Usando useAuth para buscar os dados do usuário
  const { data: user, loading } = useAuth<User>('user/findOne');

  // Se estiver carregando os dados
  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  // Se não encontrar dados do usuário ou ocorrer algum erro
  if (!user) {
    return <p>Não foi possível carregar os dados do perfil.</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={user.name || ""}
          onChange={(e) => {
            // Para editar o nome do usuário localmente
            // Não alteramos o estado diretamente aqui porque estamos usando useAuth
          }}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={user.email || ""}
          onChange={(e) => {
            // Para editar o e-mail do usuário localmente
            // Sem alterar o estado diretamente aqui também
          }}
        />
      </div>
      <div className="p-4">
        <ButtonRequest
          show_text="Atualizar Dados"
          url={`/user/${user.id}`}
          header={{
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          }}
        />
      </div>
    </div>
  );
}
