'use client';

import { useState } from "react";
import { fetchData } from "./services/api"; // ajuste caminho se necessário

type BotaoInterativoProps = {
  nome: string;
};

export default function BotaoInterativo({ nome }: BotaoInterativoProps) {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const data = await fetchData('/user'); // chama GET /user
      setUsuarios(data);
      setErro(null);
    } catch (err: any) {
      console.error(err);
      setErro(err.message || 'Erro ao consultar usuários');
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Buscar Usuários
      </button>

      {erro && <p className="text-red-500 mt-2">{erro}</p>}

      <ul className="mt-4">
        {usuarios.map((usuario, index) => (
          <li key={index}>{JSON.stringify(usuario)}</li>
        ))}
      </ul>
    </div>
  );
}
