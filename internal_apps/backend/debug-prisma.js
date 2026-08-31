const { PrismaClient } = require('./node_modules/.prisma/client-user-service');

async function main() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres:postgres@127.0.0.1:5432/user_db?schema=public"
      }
    }
  });

  try {
    const count = await prisma.user.count();
    console.log('User count:', count);
  } catch (e) {
    console.error('Connection failed:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
