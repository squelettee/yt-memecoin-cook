-- DropIndex
DROP INDEX "Template_projectName_key";

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "backgroundColor" VARCHAR(255) NOT NULL DEFAULT '#000000',
ADD COLUMN     "bodyFont" VARCHAR(255) NOT NULL DEFAULT 'geist',
ADD COLUMN     "headingColor" VARCHAR(255) NOT NULL DEFAULT '#ffffff',
ADD COLUMN     "headingFont" VARCHAR(255) NOT NULL DEFAULT 'geist',
ALTER COLUMN "projectName" DROP NOT NULL;
