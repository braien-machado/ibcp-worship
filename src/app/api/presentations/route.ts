import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Key = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

type Song = {
  id?: string
  name: string
  author: string
  videoUrl?: string
  key?: Key
}

export async function GET (_request: Request) {
  const result = await prisma.presentation.findMany({
    include: { songs: { include: { song: true } } }
  });
  return NextResponse.json(result);
}

export async function POST (request: Request) {
  try {
    const { date, songs } = await request.json();
    const presentation = await prisma.$transaction(async (tx) => {
      const createdSongs = await Promise.all(songs.map(async ({ name, author, key, videoUrl }: Song) => {
        const createdSong = await tx.song.create({ data: { name, author, videoUrl } });
        return { key, songId: createdSong.id };
      }));
  
      return tx.presentation.create({
        data: {
          date: new Date(date),
          songs: {
            createMany: {
              data: createdSongs
            }
          }
        }
      })
    });
  
    return new NextResponse(JSON.stringify(presentation), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
