'use client'

// components/ButtonRequest.tsx
import { useState } from "react";
import { fetchData } from "../services/api";

type ButtonRequestProps = {
  show_text: string;
  type_req: string;
};

export default function ButtonRequest({ show_text, type_req }: ButtonRequestProps) {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const handleClick = async () => {
    try {
      const data = await fetchData(type_req);
      setUsuarios(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        {show_text}
      </button>

      <ul className="mt-4">
        {usuarios.map((usuario, index) => (
          <li key={index}>{JSON.stringify(usuario)}</li>
        ))}
      </ul>
    </div>
  );
}
