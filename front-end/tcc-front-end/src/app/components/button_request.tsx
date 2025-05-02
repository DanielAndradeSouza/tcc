// components/ButtonRequest.tsx
'use client';

import { useState } from "react";
import { fetchData } from "../services/api";

type ButtonRequestProps = {
  show_text: string;
  url: string;
  header: RequestInit;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

export default function ButtonRequest({ show_text, url, header, onSuccess, onError }: ButtonRequestProps) {
  const handleClick = async () => {
    try {
      const data = await fetchData(url, header);

      // Supondo que o backend retorna { success: true } ou o objeto criado
      if (data && !data.error) {
        onSuccess?.(data);
      } else {
        onError?.(data?.error || "Dados Incorretos");
      }
    } catch (err: any) {
      onError?.(err.message || "Erro na requisição");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
    >
      {show_text}
    </button>
  );
}
