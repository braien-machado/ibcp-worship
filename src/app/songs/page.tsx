import Song from '@/interfaces/Song'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IBCP - Músicas'
}

async function getSongs (): Promise<Song[]> {
  const data = await fetch(`${process.env.APP_URL}/api/songs`)

  if (!data.ok) return []
  return data.json()
}

export default async function Songs() {
  const data = await getSongs();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>IBCP</h1>
      <h3>Igreja Batista em Conselheiro Paulino</h3>
      <h3>Músicas</h3>
      <ul>
        {data.map((song: Song) => (
          <li key={song.id}>
            <span>{song.name}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
