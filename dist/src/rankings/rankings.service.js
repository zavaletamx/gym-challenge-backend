"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RankingsService = class RankingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDaily() {
        const today = new Date().toISOString().split('T')[0];
        return this.prisma.checkin.findMany({
            where: { date: today },
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async getYearly() {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1).toISOString();
        const checkins = await this.prisma.checkin.findMany({
            where: {
                createdAt: {
                    gte: new Date(startOfYear),
                },
            },
            select: {
                userId: true,
                createdAt: true,
                user: { select: { name: true } },
            },
        });
        const map = new Map();
        for (const c of checkins) {
            if (!map.has(c.userId)) {
                map.set(c.userId, {
                    userId: c.userId,
                    name: c.user.name || 'Unknown',
                    count: 0,
                    lastCheckin: c.createdAt,
                });
            }
            const entry = map.get(c.userId);
            entry.count++;
            if (c.createdAt > entry.lastCheckin) {
                entry.lastCheckin = c.createdAt;
            }
        }
        return Array.from(map.values()).sort((a, b) => b.count - a.count);
    }
};
exports.RankingsService = RankingsService;
exports.RankingsService = RankingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RankingsService);
//# sourceMappingURL=rankings.service.js.map