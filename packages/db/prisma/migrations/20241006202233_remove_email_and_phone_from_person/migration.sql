/*
  Warnings:

  - You are about to drop the column `email` on the `people` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `people` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "people" DROP COLUMN "email",
DROP COLUMN "phone";
