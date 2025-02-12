/*
  Warnings:

  - You are about to drop the column `template` on the `Template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "template",
ADD COLUMN     "type" VARCHAR(255) NOT NULL DEFAULT 'basic';
