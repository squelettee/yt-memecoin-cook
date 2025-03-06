"use server";

import { prisma } from "@/lib/prisma";

export async function getOrCreateUser(address: string) {
  try {
    let user = await prisma.user.findUnique({
      where: { address },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { address },
      });
    }

    return user;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération/création de l'utilisateur:",
      error,
    );
    return {
      error:
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue",
    };
  }
}
