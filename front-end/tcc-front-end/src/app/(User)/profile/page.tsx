'use client'
// pages/PageUser.tsx
import { useEffect, useState } from "react";
import ButtonRequest from "../../components/button_request";
import { fetchData } from "@/app/services/api";
export default function PerfilPage() {

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchUser(){
      try{
        const data = await fetchData('user/findOne',{credentials:'include'});
        if(data){
          setUser(data);
        }
      }catch(e){
        console.error("Dados não encontrados. Mensagem: ", e);
      }
    }
    fetchUser();
  },[]);
  return (
    <div>
        <h1>Profile</h1>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text"value={user?.name || ""}onChange={(e) =>setUser((prev) => ({ ...prev!, name: e.target.value }))}/>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text"value={user?.email || ""}onChange={(e) =>setUser((prev) => ({ ...prev!, email: e.target.value }))}/>
        </div>
        <div className="p-4">
        <ButtonRequest show_text="Atualizar Dados" url={`/user/${user?.id}`}
            header={{
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({user})
          }} 
        />

      </div>
    </div>
  );
}
