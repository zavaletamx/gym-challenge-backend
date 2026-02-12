require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
try {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        }
    });

    console.log('Client loaded successfully');
    prisma.$disconnect();
} catch (e) {
    console.error(e);
}
