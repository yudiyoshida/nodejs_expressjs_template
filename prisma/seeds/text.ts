import { PrismaClient, TextType } from '@prisma/client';

const texts = Object.values(TextType);

export async function seedTexts(prisma: PrismaClient) {
  for (const text of texts) {
    await prisma.text.create({
      data: {
        type: text,
        content: `${text} vindo da API. Rota integrada.`,
      },
    });
  }

  console.log('Texts seed OK.');
}
