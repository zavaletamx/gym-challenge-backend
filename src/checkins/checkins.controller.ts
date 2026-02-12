import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	UseInterceptors,
	UploadedFile,
	Req,
	Query,
	ParseIntPipe,
} from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '../common/types';

@Controller('checkins')
@UseGuards(JwtAuthGuard)
export class CheckinsController {
	constructor(private readonly checkinsService: CheckinsService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	create(
		@Req() req: any,
		@UploadedFile() file: Express.Multer.File,
		@Body() createCheckinDto: CreateCheckinDto,
	) {
		return this.checkinsService.create(req.user.id, file, createCheckinDto);
	}

	@Get()
	findAll(@Query() query: any) {
		return this.checkinsService.findAll(query);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.checkinsService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
		const isAdmin = req.user.role === Role.ADMIN;
		return this.checkinsService.remove(id, req.user.id, isAdmin);
	}
}
