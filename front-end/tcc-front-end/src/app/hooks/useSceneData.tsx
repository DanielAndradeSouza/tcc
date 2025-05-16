import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import { useRouter } from 'next/navigation';

export function useSceneData() {
  const [scene, setScene] = useState<Scene | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchScene() {
      try {
        const id = localStorage.getItem("sceneId");
        console.log(id);
        const result = await fetchData(`scene/${id}`, {credentials: 'include'});
        console.log(result);
        setScene(result);
      } catch (err: any) {
        switch(err.status){
          case 401:
            router.push("/login");
          case 404:
            alert("Cena não encontrada! Redirecinondo para a home page!")
            router.push("/tables");
          default:
            alert("Erro no servidor!");
            router.push("/tables");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchScene();
  }, []); 

  return { scene, loading };
}
