/*
  Warnings:

  - You are about to drop the column `user_id` on the `accounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "_AccountToPerson" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToPerson_AB_unique" ON "_AccountToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToPerson_B_index" ON "_AccountToPerson"("B");

-- AddForeignKey
ALTER TABLE "_AccountToPerson" ADD CONSTRAINT "_AccountToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToPerson" ADD CONSTRAINT "_AccountToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;
