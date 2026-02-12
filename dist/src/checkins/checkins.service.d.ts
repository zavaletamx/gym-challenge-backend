import { CreateCheckinDto } from './dto/create-checkin.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CheckinsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, file: Express.Multer.File, createCheckinDto: CreateCheckinDto): Promise<{
        id: number;
        userId: number;
        imageUrl: string;
        latitude: number;
        longitude: number;
        createdAt: Date;
        date: string;
    }>;
    findAll(query: any): Promise<{
        data: ({
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
        })[];
        total: number;
    }>;
    findOne(id: number): Promise<{
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
    }>;
    remove(id: number, userId: number, isAdmin: boolean): Promise<{
        id: number;
        userId: number;
        imageUrl: string;
        latitude: number;
        longitude: number;
        createdAt: Date;
        date: string;
    }>;
}
