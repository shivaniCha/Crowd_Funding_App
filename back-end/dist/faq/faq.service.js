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
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const faq_entity_1 = require("./faq.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const project_service_1 = require("../project/project.service");
const user_service_1 = require("../user/user.service");
let FaqService = class FaqService {
    constructor(faqRepo, projectService, userService) {
        this.faqRepo = faqRepo;
        this.projectService = projectService;
        this.userService = userService;
    }
    async writeAQuestion(questionInput) {
        const { question, from, project_name } = questionInput;
        const proj = await this.projectService.getProjectByProjectName(project_name);
        const user = await this.userService.getUserByUsername(from);
        if (user) {
            if (proj) {
                if (user.username === proj.username) {
                    throw new Error('Owner Cannot Write A Question');
                }
                else {
                    const faq = this.faqRepo.create({
                        id: (0, uuid_1.v4)(),
                        answer: '',
                        from: user.username,
                        project_name: proj.project_name,
                        question,
                        to: proj.username,
                    });
                    return await this.faqRepo.save(faq);
                }
            }
            else {
                throw new Error('Project With Project Name ' + project_name + ' Not Found');
            }
        }
        else {
            throw new Error('Please Sign Up To Post A Question');
        }
    }
    async writeAnswer(answerInput) {
        const { answer, id, project_name } = answerInput;
        const proj = await this.projectService.getProjectByProjectName(project_name);
        if (proj) {
            const question = await this.faqRepo.findOne({
                where: { id, project_name: proj.project_name },
            });
            if (question) {
                await this.faqRepo.update(question._id, {
                    project_name,
                    answer,
                });
                return true;
            }
            else {
                throw new Error(`Project Names Do Not Match For This Question`);
            }
        }
        else {
            throw new Error('Project With Name ' + project_name + ' Not Found');
        }
    }
    async deleteQuestions(project_name) {
        const result = await this.faqRepo.delete({ project_name });
        return result.affected > 0;
    }
    async getFaqs() {
        return await this.faqRepo.find();
    }
};
FaqService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(faq_entity_1.FAQ)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => project_service_1.ProjectService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        project_service_1.ProjectService,
        user_service_1.UserService])
], FaqService);
exports.FaqService = FaqService;
//# sourceMappingURL=faq.service.js.map