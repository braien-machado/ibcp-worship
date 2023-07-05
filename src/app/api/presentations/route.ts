import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { Key, Period } from '@/helpers/types';
import { presentationCreateFormSchema } from '@/helpers/zod/schemas';
import Song from "@/interfaces/Song";

const prisma = new PrismaClient();

interface PresentationSong extends Omit<Song, 'id'> {
  key: Key
}

interface PresentationForm {
  date: string;
  period: Period;
  songs: PresentationSong[]
}

export async function GET (_request: Request) {
  const result = await prisma.presentation.findMany({
    include: { songs: { include: { song: true } } }
  });
  return NextResponse.json(result);
}

export async function POST (request: Request) {
  try {
    const reqBody: PresentationForm = await request.json();
    
    const zodValidation = presentationCreateFormSchema.safeParse(reqBody);
    if (!zodValidation.success) return new NextResponse(
      JSON.stringify(zodValidation.error.issues),
      { status: 400 }
    );

    const { date, period, songs } = reqBody;
    const presentation = await prisma.$transaction(async (tx) => {
      const songsData = await Promise.all(songs.map(async ({ name, author, key, videoUrl }) => {
        const songInTable = await tx.song.findUnique({ where: { name_author: { author, name } } });

        if (songInTable === null) {
          const { id: songId } = await tx.song.create({ data: { name, author, videoUrl } });
          return { key, songId };
        }

        return { key, songId: songInTable.id };
      }));

      return tx.presentation.create({
        data: {
          date: new Date(date),
          period,
          songs: {
            createMany: {
              data: songsData
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
