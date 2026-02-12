import { Test, TestingModule } from '@nestjs/testing';
import { CheckinsService } from './checkins.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('CheckinsService', () => {
	let service: CheckinsService;
	let prisma: PrismaService;

	const mockPrisma = {
		checkin: {
			findFirst: jest.fn(),
			create: jest.fn(),
		},
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CheckinsService,
				{ provide: PrismaService, useValue: mockPrisma },
			],
		}).compile();

		service = module.get<CheckinsService>(CheckinsService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		const userId = 1;
		const file = { filename: 'test.jpg' } as any;
		const dto = { latitude: 10, longitude: 20 };

		it('should use the provided date if available', async () => {
			const localDate = '2026-02-12';
			mockPrisma.checkin.findFirst.mockResolvedValue(null);
			mockPrisma.checkin.create.mockResolvedValue({ id: 1 });

			await service.create(userId, file, { ...dto, date: localDate });

			expect(mockPrisma.checkin.findFirst).toHaveBeenCalledWith({
				where: { userId, date: localDate },
			});
			expect(mockPrisma.checkin.create).toHaveBeenCalledWith({
				data: {
					userId,
					imageUrl: '/uploads/test.jpg',
					latitude: dto.latitude,
					longitude: dto.longitude,
					date: localDate,
				},
			});
		});

		it('should fall back to UTC date if no date is provided', async () => {
			const utcDate = new Date().toISOString().split('T')[0];
			mockPrisma.checkin.findFirst.mockResolvedValue(null);
			mockPrisma.checkin.create.mockResolvedValue({ id: 1 });

			await service.create(userId, file, dto);

			expect(mockPrisma.checkin.findFirst).toHaveBeenCalledWith({
				where: { userId, date: utcDate },
			});
		});

		it('should throw BadRequestException if user already checked in', async () => {
			mockPrisma.checkin.findFirst.mockResolvedValue({ id: 1 });

			await expect(service.create(userId, file, dto)).rejects.toThrow(
				BadRequestException,
			);
		});
	});
});
