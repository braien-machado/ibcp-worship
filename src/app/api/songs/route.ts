import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Song = {
  id?: string
  name: string
  author: string
  videoUrl?: string
}

export async function GET (_request: Request) {
  const result = await prisma.song.findMany({
    include: { presentations: { include: { presentation: true } } }
  });
  return NextResponse.json(result);
}
