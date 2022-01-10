-- CreateTable
CREATE TABLE "receita" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "prepare" TEXT NOT NULL,
    "portions" INTEGER NOT NULL,

    CONSTRAINT "receita_pkey" PRIMARY KEY ("id")
);
