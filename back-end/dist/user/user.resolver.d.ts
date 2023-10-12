import { UserService } from './user.service';
import { CreateUserInput } from './createUserInput';
import { User } from './user.entity';
import { BookMark } from './bookMarkProject-DTO';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    getUsers(_: any, __: any, ___: any, info: any): Promise<User[]>;
    createUser(createUserInput: CreateUserInput): Promise<User>;
    bookMarkAProject(bookMark: BookMark): Promise<boolean>;
    getUser(username: string): Promise<User>;
}
