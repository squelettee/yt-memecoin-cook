import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { subdomainErrors } from '@/schemas/subdomainSchema'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const subdomain = searchParams.get('subdomain')

    if (!subdomain) {
      return NextResponse.json(
        { error: subdomainErrors.required },
        { status: 400 }
      )
    }

    const subdomainRegex = /^[a-z0-9-]+$/
    if (!subdomainRegex.test(subdomain)) {
      return NextResponse.json(
        { error: subdomainErrors.format },
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
        { error: subdomainErrors.taken },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      subdomain
    })
  } catch (error) {
    console.error('Subdomain check error:', error)
    return NextResponse.json(
      { error: subdomainErrors.connection },
      { status: 500 }
    )
  }
}
