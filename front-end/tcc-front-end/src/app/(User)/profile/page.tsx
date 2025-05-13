'use client'

import { useAuth } from "@/app/hooks/useAuth";
import ButtonRequest from "../../components/button_request";
import ConfirmModal from "@/app/components/modals/confirm_modal";
import { useState, useEffect } from "react";
import { fetchData } from "@/app/services/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: user, loading } = useAuth<User>('user/findOne');
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (loading) return <p>Carregando perfil...</p>;
  if (!user) return <p>Não foi possível carregar os dados do perfil.</p>;

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function handleConfirm() {
    try {
      await fetchData(`user/deactivate/${user.id}`, {method:'PATCH' ,credentials: 'include' });
      console.log("Usuário Desativado!");
      closeModal();
      await localStorage.clear();
      await fetchData(`auth/logout`,{method:'POST',credentials:'include'});
      router.push('create_account');
    } catch (e) {
      console.error("Erro ao desativar usuário:", e);
    }
  }

  return (
    <div>
      <h1>Perfil</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            body: JSON.stringify({
              ...user,
              name,
              email,
            }),
          }}
          onSuccess={() => alert("Dados Atualizados com Sucesso!")}
          onError={() => alert("Errp de requisição.")}
        />
      </div>
      <div>
        <button onClick={openModal}>Desativar Conta</button>
        <ConfirmModal
          isOpen={modalOpen}
          onClose={closeModal}
          onConfirm={handleConfirm}
          title="Você tem certeza?"
          message="Tem certeza que deseja desativar sua conta?"
        />
      </div>
    </div>
  );
}
