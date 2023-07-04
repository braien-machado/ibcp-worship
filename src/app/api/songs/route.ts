import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET (_request: Request) {
  const result = await prisma.song.findMany({
    include: { presentations: { include: { presentation: true } } }
  });
  return NextResponse.json(result);
}
