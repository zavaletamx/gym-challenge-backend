"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Generating 21 check-ins for January (User 5)...');
    const userId = 5;
    const imageUrl = '/uploads/file-1770839964083-975869324.png';
    const lat = 20.64938155060418;
    const lng = -100.312689113276;
    for (let day = 1; day <= 21; day++) {
        const dayStr = day.toString().padStart(2, '0');
        const dateStr = `2026-01-${dayStr}`;
        const createdAt = new Date(`${dateStr}T15:00:00.000Z`);
        const existing = await prisma.checkin.findFirst({
            where: { userId, date: dateStr }
        });
        if (!existing) {
            await prisma.checkin.create({
                data: {
                    userId,
                    imageUrl,
                    latitude: lat,
                    longitude: lng,
                    date: dateStr,
                    createdAt
                }
            });
            console.log(`Created check-in for User 5 on ${dateStr}`);
        }
        else {
            console.log(`Check-in for User 5 on ${dateStr} already exists, skipping.`);
        }
    }
    console.log('Generation completed.');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=generate-history.js.map