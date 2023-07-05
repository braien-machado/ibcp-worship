-- CreateEnum
CREATE TYPE "Period" AS ENUM ('dia', 'noite');

-- CreateEnum
CREATE TYPE "Key" AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G');

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "videoUrl" TEXT,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presentation" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "period" "Period" NOT NULL,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PresentationSong" (
    "id" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "key" "Key",

    CONSTRAINT "PresentationSong_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_name_author_key" ON "Song"("name", "author");

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_date_period_key" ON "Presentation"("date", "period");

-- CreateIndex
CREATE UNIQUE INDEX "PresentationSong_presentationId_songId_key" ON "PresentationSong"("presentationId", "songId");

-- AddForeignKey
ALTER TABLE "PresentationSong" ADD CONSTRAINT "PresentationSong_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PresentationSong" ADD CONSTRAINT "PresentationSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
