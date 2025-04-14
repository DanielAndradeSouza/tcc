'use client'
// pages/PageUser.tsx
import { useState } from "react";
import ButtonRequest from "../../components/button_request";

export default function CadastroPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
        <h1>Criar Conta</h1>

        <div>
        <label htmlFor="username">Nome de Usuário</label>
        <input type="text" name="username" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label htmlFor="password">Senha</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="p-4">
        <ButtonRequest show_text="Buscar Usuários" url="/user" 
            header={{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
          }} 
        />

      </div>
    </div>
  );
}
