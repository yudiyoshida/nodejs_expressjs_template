const { hashPassword } = require("../../src/app/helpers/hash");
const { PrismaClient, TextType, AdminPermission } = require("@prisma/client");
const prisma = new PrismaClient();

class SeedPrisma {
  constructor() {
    this.admin = {
      type: "admin",
      is_admin: true,
      name: "Admin Master",
      email:  "admin@getnada.com",
      password: "123456789",
      status: "ativo"
    };
  }

  async seedTexts() {
    for (let text of Object.values(TextType)) {
      await prisma.text.create({
        data: {
          type: text,
          content: `${text} vindo da API. Rota integrada.`
        }
      });
    }
  }

  async seedAdmin() {
    this.admin.password = hashPassword(this.admin.password);
    const admin = await prisma.user.create({
      data: this.admin
    });

    for (let permission of Object.values(AdminPermission)) {
      await prisma.permission.create({
        data: {
          title: permission,
          admins: {
            connect: { id: admin.id }
          }
        }
      });
    }
  }

  async seedPermissions() {
  }
}

async function main() {
  const Seed = new SeedPrisma();
  
  await Seed.seedTexts();
  console.log("Texts seed OK.");
  
  await Seed.seedAdmin();
  console.log("Admin user seed OK.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
