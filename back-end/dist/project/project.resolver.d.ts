import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectInput } from './createProjectInput';
import { PledgeAProject } from './pledgeProject.DTO';
import { DeleteProject } from './deleteProjectInput';
import { Comment } from './commentProjectInput';
export declare class ProjectResolver {
    private projectService;
    constructor(projectService: ProjectService);
    getProjects(): Promise<Project[]>;
    createProject(createProjectInput: CreateProjectInput): Promise<Project>;
    getAllProjectsOfAUser(username: string): Promise<Project[]>;
    getProjectsByCatagory(catagory?: string): Promise<Project[]>;
    pledgeAProject(pledgeAProjectInput: PledgeAProject): Promise<Project>;
    DeleteProject(deleteProject: DeleteProject): Promise<boolean>;
    comment(comment: Comment): Promise<boolean>;
    likeAProject(project_name: string, username: string): Promise<boolean>;
    endTime(): Promise<any>;
    handle(): void;
}
