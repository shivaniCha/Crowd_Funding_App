import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './createUserInput';
import { ProjectService } from 'src/project/project.service';
import { BookMark } from './bookMarkProject-DTO';
export declare class UserService {
    private projectService;
    private userRepository;
    constructor(projectService: ProjectService, userRepository: Repository<User>);
    registerUser(createUserInput: CreateUserInput): Promise<User>;
    getUsers(): Promise<User[]>;
    getUserByUsername(username: string): Promise<User>;
    getUser(username: string, password: string): Promise<User>;
    bookMarkAProject(bookMark: BookMark): Promise<boolean>;
    removeBookMark(username: string, project_name: string): Promise<void>;
    removeProject(username: string, project_name: string): Promise<void>;
    insertLikedProject(username: string, project_name: string): Promise<boolean>;
}
