import { RankingsService } from './rankings.service';
export declare class RankingsController {
    private readonly rankingsService;
    constructor(rankingsService: RankingsService);
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
