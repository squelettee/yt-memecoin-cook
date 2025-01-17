import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Crée 10 templates avec des noms aléatoires
  for (let i = 0; i < 10; i++) {
    const randomName = `pro${Math.random().toString(36).substring(2, 7)}`
    const template = await prisma.template.create({
      data: {
        projectName: randomName,
        description: `Description de ${randomName}`,
        logo: `https://example.com/${randomName}-logo.png`,
        telegram: `https://t.me/${randomName}`,
        twitter: `https://twitter.com/${randomName}`,
        ticker: randomName.toUpperCase(),
        jupiter: Math.random() > 0.5,
      },
    })

    // Crée un domaine pour chaque template
    const domain = await prisma.domain.create({
      data: {
        name: `${randomName.toLowerCase()}`,
        template: {
          connect: {
            projectName: template.projectName,
          },
        },
      },
    })

    console.log({ template, domain })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 