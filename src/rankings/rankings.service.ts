import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RankingsService {
	constructor(private prisma: PrismaService) {}

	async getDaily() {
		const today = new Date().toISOString().split('T')[0];
		// detailed list of checkins for today
		return this.prisma.checkin.findMany({
			where: { date: today },
			include: {
				user: { select: { id: true, name: true, email: true } },
			},
			orderBy: { createdAt: 'asc' },
		});
	}

	async getYearly() {
		const startOfYear = new Date(
			new Date().getFullYear(),
			0,
			1,
		).toISOString();
		// Aggregate counts by user
		// Since prisma groupBy might be limited or require specific preview features sometimes,
		// we can use raw query or findMany if dataset is small.
		// For now, let's use groupBy if available on checkin.
		// However, without generated client, we might not have types.
		// Fallback: findMany for this year and aggregate in JS (safer given the environment issues).

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

		const map = new Map<
			number,
			{ userId: number; name: string; count: number; lastCheckin: Date }
		>();
		for (const c of checkins) {
			if (!map.has(c.userId)) {
				map.set(c.userId, {
					userId: c.userId,
					name: c.user.name || 'Unknown',
					count: 0,
					lastCheckin: c.createdAt,
				});
			}
			const entry = map.get(c.userId)!;
			entry.count++;
			if (c.createdAt > entry.lastCheckin) {
				entry.lastCheckin = c.createdAt;
			}
		}

		return Array.from(map.values()).sort((a, b) => b.count - a.count);
	}
}
