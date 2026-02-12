import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const checkins = await prisma.checkin.findMany();
    console.log(JSON.stringify(checkins, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
