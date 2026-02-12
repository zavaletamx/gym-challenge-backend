import {
	IsLatitude,
	IsLongitude,
	IsNotEmpty,
	IsNumber,
	IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCheckinDto {
	@IsNotEmpty()
	@Type(() => Number)
	@IsLatitude()
	latitude: number;

	@IsNotEmpty()
	@Type(() => Number)
	@IsLongitude()
	longitude: number;

	@IsString()
	@IsNotEmpty()
	date?: string;
}
