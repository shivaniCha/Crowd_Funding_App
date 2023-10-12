import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectInput } from './createProjectInput';
import { UserService } from 'src/user/user.service';
import { PledgeAProject } from './pledgeProject.DTO';
import { DeleteProject } from './deleteProjectInput';
import { Comment } from './commentProjectInput';
import { FaqService } from 'src/faq/faq.service';
export declare class ProjectService {
    private projectRepository;
    private userService;
    private httpService;
    private faqService;
    constructor(projectRepository: Repository<Project>, userService: UserService, httpService: HttpService, faqService: FaqService);
    getProjects(): Promise<Project[]>;
    createProject(createProjectInput: CreateProjectInput): Promise<Project>;
    getAllProjectsOfAUser(username: string): Promise<Project[]>;
    getProjectByProjectName(project_name: string): Promise<Project>;
    pledgeAProject(pledgeAProject: PledgeAProject): Promise<Project>;
    deleteProjectOfUser(deleteProject: DeleteProject): Promise<boolean>;
    endTime(): Promise<any>;
    uploadPic(imageData: string): Promise<any>;
    comment(commentInp: Comment): Promise<boolean>;
    getAllProjectsByCatagory(catagory: string): Promise<Project[]>;
    likeProject(project_name: string, username: string): Promise<boolean>;
}
