import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CheckinsService {
	constructor(private prisma: PrismaService) { }

	async create(
		userId: number,
		file: Express.Multer.File,
		createCheckinDto: CreateCheckinDto,
	) {
		if (!file) {
			throw new BadRequestException('File is required');
		}

		const todayDate =
			createCheckinDto.date || new Date().toISOString().split('T')[0];
		console.log('Check-in attempt:', {
			userId,
			providedDate: createCheckinDto.date,
			calculatedDate: todayDate,
			serverTime: new Date().toISOString(),
		});

		// Check if user already checked in today
		// We can use the unique compound index in Prisma to handle this, or check manually
		// Manual check for clearer error
		const existing = await this.prisma.checkin.findFirst({
			where: {
				userId: userId,
				date: todayDate,
			},
		});

		if (existing) {
			throw new BadRequestException('You have already checked in today');
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

	async findAll(query: any) {
		const { userId, from, to, limit = 20, offset = 0 } = query;
		const where: any = {};
		if (userId) where.userId = Number(userId);
		if (from || to) {
			where.createdAt = {};
			if (from) where.createdAt.gte = new Date(from);
			if (to) {
				const toDate = new Date(to);
				toDate.setHours(23, 59, 59, 999);
				where.createdAt.lte = toDate;
			}
		}

		const [data, total] = await Promise.all([
			this.prisma.checkin.findMany({
				where,
				include: {
					user: { select: { id: true, name: true, email: true } },
				},
				orderBy: { createdAt: 'desc' },
				take: Number(limit),
				skip: Number(offset),
			}),
			this.prisma.checkin.count({ where }),
		]);

		return { data, total };
	}

	async findOne(id: number) {
		const checkin = await this.prisma.checkin.findUnique({
			where: { id },
			include: {
				user: { select: { id: true, name: true, email: true } },
			},
		});
		if (!checkin) throw new NotFoundException('Checkin not found');
		return checkin;
	}

	async remove(id: number, userId: number, isAdmin: boolean) {
		const checkin = await this.findOne(id);
		if (!isAdmin && checkin.userId !== userId) {
			throw new BadRequestException(
				'You can only delete your own checkins',
			);
		}
		return this.prisma.checkin.delete({ where: { id } });
	}
}
