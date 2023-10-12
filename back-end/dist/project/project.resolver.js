"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const project_service_1 = require("./project.service");
const project_type_1 = require("./project.type");
const createProjectInput_1 = require("./createProjectInput");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const pledgeProject_DTO_1 = require("./pledgeProject.DTO");
const schedule_1 = require("@nestjs/schedule");
const deleteProjectInput_1 = require("./deleteProjectInput");
const commentProjectInput_1 = require("./commentProjectInput");
let ProjectResolver = class ProjectResolver {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async getProjects() {
        return await this.projectService.getProjects();
    }
    async createProject(createProjectInput) {
        return await this.projectService.createProject(createProjectInput);
    }
    async getAllProjectsOfAUser(username) {
        return await this.projectService.getAllProjectsOfAUser(username);
    }
    async getProjectsByCatagory(catagory) {
        return await this.projectService.getAllProjectsByCatagory(catagory);
    }
    async pledgeAProject(pledgeAProjectInput) {
        return await this.projectService.pledgeAProject(pledgeAProjectInput);
    }
    async DeleteProject(deleteProject) {
        return await this.projectService.deleteProjectOfUser(deleteProject);
    }
    async comment(comment) {
        return await this.projectService.comment(comment);
    }
    async likeAProject(project_name, username) {
        return await this.projectService.likeProject(project_name, username);
    }
    async endTime() {
        return this.projectService.endTime();
    }
    handle() {
        this.endTime();
    }
};
__decorate([
    (0, graphql_1.Query)(() => [project_type_1.ProjectType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "getProjects", null);
__decorate([
    (0, graphql_1.Mutation)(() => project_type_1.ProjectType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('createProjectInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProjectInput_1.CreateProjectInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    (0, graphql_1.Query)(() => [project_type_1.ProjectType]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "getAllProjectsOfAUser", null);
__decorate([
    (0, graphql_1.Query)(() => [project_type_1.ProjectType]),
    __param(0, (0, graphql_1.Args)('catagory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "getProjectsByCatagory", null);
__decorate([
    (0, graphql_1.Mutation)(() => project_type_1.ProjectType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('pleadge')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pledgeProject_DTO_1.PledgeAProject]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "pledgeAProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('deleteProject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteProjectInput_1.DeleteProject]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "DeleteProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commentProjectInput_1.Comment]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "comment", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('project_name')),
    __param(1, (0, graphql_1.Args)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "likeAProject", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "endTime", null);
__decorate([
    (0, schedule_1.Interval)(86400000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "handle", null);
ProjectResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectResolver);
exports.ProjectResolver = ProjectResolver;
//# sourceMappingURL=project.resolver.js.map