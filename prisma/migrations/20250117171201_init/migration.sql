/*
  Warnings:

  - A unique constraint covering the columns `[templateId]` on the table `Domain` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Domain_templateId_key" ON "Domain"("templateId");
