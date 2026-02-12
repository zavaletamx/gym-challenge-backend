import { PrismaService } from '../prisma/prisma.service';
export declare class RankingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDaily(): Promise<({
        user: {
            id: number;
            name: string | null;
            email: string;
        };
    } & {
        id: number;
        userId: number;
        imageUrl: string;
        latitude: number;
        longitude: number;
        createdAt: Date;
        date: string;
    })[]>;
    getYearly(): Promise<{
        userId: number;
        name: string;
        count: number;
        lastCheckin: Date;
    }[]>;
}
