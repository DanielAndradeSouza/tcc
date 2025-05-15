'use client'

import { useRouter } from 'next/navigation'

export function ReturnButton({ path, text = "Voltar" }: ReturnButtonProps) {
  const router = useRouter()

  function handleRedirect() {
    router.push(path)
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleRedirect}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 shadow"
      >
        {text}
      </button>
    </div>
  )
}
