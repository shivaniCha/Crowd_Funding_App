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
exports.FaqResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const faq_type_1 = require("./faq.type");
const faq_input_1 = require("./faq.input");
const faq_service_1 = require("./faq.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
let FaqResolver = class FaqResolver {
    constructor(faqService) {
        this.faqService = faqService;
    }
    async getHi() {
        return 'hi';
    }
    async writeAQuestion(questionInput) {
        return this.faqService.writeAQuestion(questionInput);
    }
    async writeAnswer(answerInput) {
        return this.faqService.writeAnswer(answerInput);
    }
    async deleteQuestions(project_name) {
        return this.faqService.deleteQuestions(project_name);
    }
    async getFaqs() {
        return this.faqService.getFaqs();
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FaqResolver.prototype, "getHi", null);
__decorate([
    (0, graphql_1.Mutation)(() => faq_type_1.FAQType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('writeQuestion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [faq_input_1.FAQInput]),
    __metadata("design:returntype", Promise)
], FaqResolver.prototype, "writeAQuestion", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('writeAnswer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [faq_input_1.FAQInput]),
    __metadata("design:returntype", Promise)
], FaqResolver.prototype, "writeAnswer", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('project_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FaqResolver.prototype, "deleteQuestions", null);
__decorate([
    (0, graphql_1.Query)(() => [faq_type_1.FAQType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FaqResolver.prototype, "getFaqs", null);
FaqResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], FaqResolver);
exports.FaqResolver = FaqResolver;
//# sourceMappingURL=faq.resolver.js.map