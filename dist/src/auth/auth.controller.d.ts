import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<{
        message: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: number;
        createdAt: Date;
        name: string | null;
        email: string;
        username: string;
        role: import(".prisma/client").$Enums.Role;
        updatedAt: Date;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
}
