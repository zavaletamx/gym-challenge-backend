import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

// With JS/MJS we do NOT need to cast to any for types, 
// but we still need to make sure datasources structure is valid for the client.
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

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
                role: 'ADMIN',
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
