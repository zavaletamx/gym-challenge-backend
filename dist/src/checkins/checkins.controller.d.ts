import { CheckinsService } from './checkins.service';
import { CreateCheckinDto } from './dto/create-checkin.dto';
export declare class CheckinsController {
    private readonly checkinsService;
    constructor(checkinsService: CheckinsService);
    create(req: any, file: Express.Multer.File, createCheckinDto: CreateCheckinDto): Promise<{
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
    remove(id: number, req: any): Promise<{
        id: number;
        userId: number;
        imageUrl: string;
        latitude: number;
        longitude: number;
        createdAt: Date;
        date: string;
    }>;
}
