import { useEffect, useState } from "react";

export function useSceneData(sceneId:number | null){
  const [scene, setScene] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sceneId) return;
    const fetchScene = async () => {
      try {
        const res = await fetch(`table/scene/${sceneId}`, { credentials: "include" });
        const data = await res.json();
        console.log(data);
        setScene(data);
      } catch (err) {
        console.error("Erro ao carregar cena:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScene();
  }, [sceneId]);

  return { scene, loading };
}