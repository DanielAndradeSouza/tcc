'use client'
// pages/PageUser.tsx
import { useEffect, useState } from "react";
import ButtonRequest from "../../components/button_request";
import { fetchData } from "@/app/services/api";

export default function PerfilPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
/*  useEffect(() => {
    async function findUser(){
        const data = fetchData('user/findOne',{credentials:'include'});
    }
  })*/
  return (
    <div>
        <h1>Perfil</h1>
        <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label htmlFor="password">Senha</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="p-4">
        <ButtonRequest show_text="Login" url="/auth/login" 
            header={{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
          }} 
        />

      </div>
    </div>
  );
}
