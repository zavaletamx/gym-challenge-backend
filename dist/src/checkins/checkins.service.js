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
exports.CheckinsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CheckinsService = class CheckinsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, file, createCheckinDto) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        const todayDate = new Date().toISOString().split('T')[0];
        const existing = await this.prisma.checkin.findFirst({
            where: {
                userId: userId,
                date: todayDate,
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('You have already checked in today');
        }
        const checkin = await this.prisma.checkin.create({
            data: {
                userId,
                imageUrl: `/uploads/${file.filename}`,
                latitude: createCheckinDto.latitude,
                longitude: createCheckinDto.longitude,
                date: todayDate,
            },
        });
        return checkin;
    }
    async findAll(query) {
        const { userId, from, to, limit = 20, offset = 0 } = query;
        const where = {};
        if (userId)
            where.userId = Number(userId);
        if (from || to) {
            where.createdAt = {};
            if (from)
                where.createdAt.gte = new Date(from);
            if (to) {
                const toDate = new Date(to);
                toDate.setHours(23, 59, 59, 999);
                where.createdAt.lte = toDate;
            }
        }
        const [data, total] = await Promise.all([
            this.prisma.checkin.findMany({
                where,
                include: { user: { select: { id: true, name: true, email: true } } },
                orderBy: { createdAt: 'desc' },
                take: Number(limit),
                skip: Number(offset),
            }),
            this.prisma.checkin.count({ where }),
        ]);
        return { data, total };
    }
    async findOne(id) {
        const checkin = await this.prisma.checkin.findUnique({
            where: { id },
            include: { user: { select: { id: true, name: true, email: true } } },
        });
        if (!checkin)
            throw new common_1.NotFoundException('Checkin not found');
        return checkin;
    }
    async remove(id, userId, isAdmin) {
        const checkin = await this.findOne(id);
        if (!isAdmin && checkin.userId !== userId) {
            throw new common_1.BadRequestException('You can only delete your own checkins');
        }
        return this.prisma.checkin.delete({ where: { id } });
    }
};
exports.CheckinsService = CheckinsService;
exports.CheckinsService = CheckinsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CheckinsService);
//# sourceMappingURL=checkins.service.js.map