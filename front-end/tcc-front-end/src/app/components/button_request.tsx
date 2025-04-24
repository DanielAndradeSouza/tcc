'use client'

// components/ButtonRequest.tsx
import { useState } from "react";
import { fetchData } from "../services/api";

type ButtonRequestProps = {
  show_text: string;
  url: string;
  header:RequestInit;
};

export default function ButtonRequest({ show_text, url, header }: ButtonRequestProps) {
  const [usuarios, setData] = useState<any[]>([]);

  const handleClick = async () => {
    try {
      const data = await fetchData(url,header);
      setData(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
        {show_text}
      </button>

      
    </div>
  );
}
