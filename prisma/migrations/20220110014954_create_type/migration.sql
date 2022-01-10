/*
  Warnings:

  - You are about to drop the column `type` on the `receita` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `receita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "receita" DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "receita" ADD CONSTRAINT "receita_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
