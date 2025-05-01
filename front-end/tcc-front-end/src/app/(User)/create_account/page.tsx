'use client'
// pages/PageUser.tsx
import { useState } from "react";
import ButtonRequest from "../../components/button_request";

export default function CreateUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
        <h1>Criar Conta</h1>

        <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="p-4">
        <ButtonRequest show_text="Criar Conta" url="/user" 
            header={{
            method: 'POST',
            credentials: 'include',
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
