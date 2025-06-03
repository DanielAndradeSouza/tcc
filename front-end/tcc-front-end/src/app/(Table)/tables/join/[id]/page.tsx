'use client'

import { fetchData } from "@/app/services/api"; // Certifique-se de que fetchData retorna uma Promise que resolve um JSON
import { useParams } from "next/navigation"; // Do App Router
import { useRouter } from "next/navigation"; // Corrigido: useRouter também do App Router
import { useEffect } from "react";

export default function Join() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function joinTable() {
      try {
        // Tente se juntar à mesa
        await fetchData(`table/join/${id}`, { credentials: "include" });

        // Busque o ID da cena do jogador
        const sceneRes = await fetchData(`table/${id}/playerscene`, { credentials: "include" });
        console.log(sceneRes);
        // Redireciona para a cena
        router.push(`/player/scene/${sceneRes.sceneId}`);
      } catch (e) {
        alert("Não foi possível se juntar à mesa!");
        console.error(e);
      }
    }

    if (id) joinTable();
  }, [id, router]);

  return <p>Entrando na mesa...</p>;
}