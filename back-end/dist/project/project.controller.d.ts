/// <reference types="multer" />
import { ProjectService } from './project.service';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    uploadFile(file: Express.Multer.File): Promise<any>;
}
