-- CreateTable
CREATE TABLE "Domain" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" VARCHAR(255) NOT NULL DEFAULT 'template1',
    "background" VARCHAR(255),
    "logo" VARCHAR(255),
    "imagePreview" VARCHAR(255),
    "projectName" VARCHAR(255),
    "ticker" VARCHAR(255),
    "description" VARCHAR(255),
    "contractAddress" VARCHAR(255),
    "buyNowLink" VARCHAR(255),
    "birdeye" VARCHAR(255),
    "coinGecko" VARCHAR(255),
    "coinMarketCap" VARCHAR(255),
    "dexscreener" VARCHAR(255),
    "dextools" VARCHAR(255),
    "pumpFun" VARCHAR(255),
    "jupiter" VARCHAR(255),
    "whitepaper" VARCHAR(255),
    "instagram" VARCHAR(255),
    "telegram" VARCHAR(255),
    "tiktok" VARCHAR(255),
    "twitter" VARCHAR(255),
    "headingFont" VARCHAR(255) NOT NULL DEFAULT 'dynapuff',
    "bodyFont" VARCHAR(255) NOT NULL DEFAULT 'dynapuff',
    "headingColor" VARCHAR(255) NOT NULL DEFAULT '#ffffff',
    "backgroundColor" VARCHAR(255) NOT NULL DEFAULT '#000000',
    "primaryColor" VARCHAR(255) NOT NULL DEFAULT '#75caff',
    "secondaryColor" VARCHAR(255) NOT NULL DEFAULT '#f5f5f5',
    "accentColor" VARCHAR(255) NOT NULL DEFAULT '#2284ec',
    "textColor" VARCHAR(255) NOT NULL DEFAULT '#000000',
    "borderColor" VARCHAR(255) NOT NULL DEFAULT '#2284ec',
    "textBorderColor" VARCHAR(255) NOT NULL DEFAULT '#000000',
    "aboutTitle" VARCHAR(255),
    "aboutContent" VARCHAR(255),
    "aboutImage" VARCHAR(255),
    "roadmapTitle" VARCHAR(255),
    "roadmapPhase1" VARCHAR(255),
    "roadmapPhase2" VARCHAR(255),
    "roadmapPhase3" VARCHAR(255),
    "roadmapEnable" BOOLEAN NOT NULL DEFAULT true,
    "howtobuyTitle" VARCHAR(255),
    "howtobuyStep1" VARCHAR(255),
    "howtobuyStep2" VARCHAR(255),
    "howtobuyStep3" VARCHAR(255),
    "howtobuyStep4" VARCHAR(255),
    "faqTitle" VARCHAR(255),
    "faqQuestion1" VARCHAR(255),
    "faqQuestion2" VARCHAR(255),
    "faqQuestion3" VARCHAR(255),
    "faqQuestion4" VARCHAR(255),
    "faqAnswer1" VARCHAR(255),
    "faqAnswer2" VARCHAR(255),
    "faqAnswer3" VARCHAR(255),
    "faqAnswer4" VARCHAR(255),
    "faqEnable" BOOLEAN NOT NULL DEFAULT true,
    "footerText" VARCHAR(255),
    "userId" INTEGER,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "lastConnected" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEarly" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_name_key" ON "Domain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Domain_templateId_key" ON "Domain"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
