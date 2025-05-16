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
        if (err.status === 404) {
          console.warn("Dados da cena não encontrados, redirecionando para tables...");
   //       router.push('/tables');
        } else {
          console.error("Erro ao carregar dados:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchScene();
  }, []); 

  return { scene, loading };
}
