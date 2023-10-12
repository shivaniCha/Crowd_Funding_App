import { JwtService } from '@nestjs/jwt';
import { UserLoginInput } from './user.login.type';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(userLoginInput: UserLoginInput): Promise<{
        accessToken: string;
    }>;
}
