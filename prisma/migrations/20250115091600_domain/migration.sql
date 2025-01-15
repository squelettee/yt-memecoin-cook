/*
  Warnings:

  - You are about to drop the column `authorId` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_authorId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "authorId",
DROP COLUMN "title",
ADD COLUMN     "background" VARCHAR(255),
ADD COLUMN     "birdeye" VARCHAR(255),
ADD COLUMN     "coinGecko" VARCHAR(255),
ADD COLUMN     "coinMarketCap" VARCHAR(255),
ADD COLUMN     "contractAddress" VARCHAR(255),
ADD COLUMN     "description" VARCHAR(255),
ADD COLUMN     "dexscreener" VARCHAR(255),
ADD COLUMN     "dextools" VARCHAR(255),
ADD COLUMN     "imagePreview" VARCHAR(255),
ADD COLUMN     "instagram" VARCHAR(255),
ADD COLUMN     "jupiter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logo" VARCHAR(255),
ADD COLUMN     "projectName" VARCHAR(255),
ADD COLUMN     "pumpFun" VARCHAR(255),
ADD COLUMN     "telegram" VARCHAR(255),
ADD COLUMN     "ticker" VARCHAR(255),
ADD COLUMN     "tiktok" VARCHAR(255),
ADD COLUMN     "twitter" VARCHAR(255),
ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "whitepaper" VARCHAR(255);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "chainId" INTEGER,
ADD COLUMN     "lastConnected" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Domain" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_name_key" ON "Domain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Domain_templateId_key" ON "Domain"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
