import { Role } from '../../common/types';
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    name: string;
    role?: Role;
}
