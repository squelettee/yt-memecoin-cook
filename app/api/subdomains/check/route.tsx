import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const subdomain = searchParams.get('subdomain')

    if (!subdomain) {
      return NextResponse.json(
        { error: 'Subdomain parameter is required' },
        { status: 400 }
      )
    }

    const subdomainRegex = /^[a-z0-9-]+$/
    if (!subdomainRegex.test(subdomain)) {
      return NextResponse.json(
        { error: 'Subdomain can only contain lowercase letters, numbers, and hyphens' },
        { status: 400 }
      )
    }

    const existingDomain = await prisma.domain.findUnique({
      where: {
        name: subdomain
      }
    })

    if (existingDomain) {
      return NextResponse.json(
        { error: 'This subdomain is already taken' },
        { status: 400 }
      )
    }

    return NextResponse.json({ subdomain })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
