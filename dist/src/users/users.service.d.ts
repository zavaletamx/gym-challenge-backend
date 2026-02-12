import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../common/types';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        createdAt: Date;
        name: string | null;
        email: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        updatedAt: Date;
    }>;
    findByUsername(username: string): Promise<{
        id: number;
        createdAt: Date;
        name: string | null;
        email: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        updatedAt: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        id: number;
        createdAt: Date;
        name: string | null;
        email: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        updatedAt: Date;
    } | null>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        name: string | null;
        email: string;
        username: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        createdAt: Date;
        name: string | null;
        email: string;
        username: string;
        role: import(".prisma/client").$Enums.Role;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        createdAt: Date;
        name: string | null;
        email: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        createdAt: Date;
        name: string | null;
        email: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    setRole(id: number, role: Role): Promise<{
        id: number;
        createdAt: Date;
        name: string | null;
        email: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        updatedAt: Date;
    }>;
}
