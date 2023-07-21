import { Metadata } from "next"

export const metadata: Metadata = {
  title: "IBCP - Página Inicial"
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>IBCP</h1>
      <h3>Igreja Batista em Conselheiro Paulino</h3>
      <p>Em breve...</p>
    </main>
  )
}
