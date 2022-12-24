/*
  Warnings:

  - You are about to drop the column `tokenId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "tokenId",
ADD COLUMN     "tokens" TEXT[];
