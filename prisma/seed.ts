import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

// Explicitly pass connection URL to avoid config loading issues in seed
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
} as any);

async function main() {
    const email = 'admin@gym.com';
    const password = 'adminpassword';
    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
        const user = await prisma.user.create({
            data: {
                email,
                username: 'admin',
                password: hashedPassword,
                name: 'Admin User',
                role: 'ADMIN' as any,
            },
        });
        console.log('Admin created:', user);
    } else {
        console.log('Admin already exists');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
