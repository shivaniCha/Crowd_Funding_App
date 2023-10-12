import { AuthService } from './auth.service';
import { UserLoginInput } from './user.login.type';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    userLogin(userLoginInput: UserLoginInput): Promise<{
        accessToken: string;
    }>;
}
