import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Basic validation: ensure required fields are present
    if (!data.projectName) {
      return NextResponse.json(
        { error: 'projectName is required' },
        { status: 400 }
      )
    }

    const template = await prisma.template.create({
      data: {
        projectName: data.projectName,
        background: data.background,
        birdeye: data.birdeye,
        coinGecko: data.coinGecko,
        coinMarketCap: data.coinMarketCap,
        contractAddress: data.contractAddress,
        description: data.description,
        dexscreener: data.dexscreener,
        dextools: data.dextools,
        imagePreview: data.imagePreview,
        instagram: data.instagram,
        jupiter: data.jupiter ?? false,
        logo: data.logo,
        pumpFun: data.pumpFun,
        telegram: data.telegram,
        ticker: data.ticker,
        tiktok: data.tiktok,
        twitter: data.twitter,
        userId: data.userId,
        whitepaper: data.whitepaper,
      },
    })

    // Create associated domain
    const domain = await prisma.domain.create({
      data: {
        name: data.projectName.toLowerCase(),
        template: {
          connect: {
            projectName: template.projectName,
          },
        },
      },
    })

    return NextResponse.json({ template, domain }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
