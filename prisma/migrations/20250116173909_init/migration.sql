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
    "background" VARCHAR(255),
    "birdeye" VARCHAR(255),
    "coinGecko" VARCHAR(255),
    "coinMarketCap" VARCHAR(255),
    "contractAddress" VARCHAR(255),
    "description" VARCHAR(255),
    "dexscreener" VARCHAR(255),
    "dextools" VARCHAR(255),
    "imagePreview" VARCHAR(255),
    "instagram" VARCHAR(255),
    "jupiter" BOOLEAN NOT NULL DEFAULT false,
    "logo" VARCHAR(255),
    "projectName" VARCHAR(255) NOT NULL,
    "pumpFun" VARCHAR(255),
    "telegram" VARCHAR(255),
    "ticker" VARCHAR(255),
    "tiktok" VARCHAR(255),
    "twitter" VARCHAR(255),
    "userId" INTEGER,
    "whitepaper" VARCHAR(255),

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "chainId" INTEGER,
    "lastConnected" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_name_key" ON "Domain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Template_projectName_key" ON "Template"("projectName");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
