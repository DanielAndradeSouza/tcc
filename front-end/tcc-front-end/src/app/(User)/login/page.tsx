'use client'
// pages/PageUser.tsx
import { useState } from "react";
import ButtonRequest from "../../components/button_request";
import { useRouter } from "next/navigation";
import { useRedirectIfAuthenticated } from "@/app/hooks/veriftLogin";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useRedirectIfAuthenticated();
  return (
    <div>
        <h1>Login</h1>
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
          onSuccess={() => router.push("/tables")}
          onError={() => alert("Dados Incorretos")}
        />

      </div>
    </div>
  );
}
