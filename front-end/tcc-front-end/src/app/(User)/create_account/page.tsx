'use client';

import { useEffect, useState } from "react";
import ButtonRequest from "../../components/button_request";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    function isAuthenticated(){
      
    }
  })
  return (
    <div>
      <h1>Criar Conta</h1>

      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="p-4">
        <ButtonRequest
          show_text="Criar Conta"
          url="/user"
          header={{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
          }}
          onSuccess={() => {
            alert("Usuário criado com sucesso!");
            router.push("/login"); 
          }}
          onError={(err) => {
            alert("Erro ao criar usuário: " + err);
          }}
        />
      </div>
    </div>
  );
}
