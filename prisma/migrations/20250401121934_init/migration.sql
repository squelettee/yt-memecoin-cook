-- AlterTable
ALTER TABLE "Template" ALTER COLUMN "expirationDate" SET DEFAULT NOW() + interval '1 month';
