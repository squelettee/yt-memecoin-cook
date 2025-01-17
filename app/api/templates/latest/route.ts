import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      take: 9,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        domain: true
      }
    })

    return NextResponse.json({ templates }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
