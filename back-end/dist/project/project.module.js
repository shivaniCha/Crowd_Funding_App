"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_resolver_1 = require("./project.resolver");
const project_entity_1 = require("./project.entity");
const typeorm_1 = require("@nestjs/typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const user_module_1 = require("../user/user.module");
const project_controller_1 = require("./project.controller");
const axios_1 = require("@nestjs/axios");
const faq_module_1 = require("../faq/faq.module");
let ProjectModule = class ProjectModule {
};
ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project]),
            (0, common_1.forwardRef)(() => faq_module_1.FaqModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            platform_express_1.MulterModule.register({ dest: './uploads' }),
        ],
        providers: [project_service_1.ProjectService, project_resolver_1.ProjectResolver],
        exports: [project_service_1.ProjectService],
        controllers: [project_controller_1.ProjectController],
    })
], ProjectModule);
exports.ProjectModule = ProjectModule;
//# sourceMappingURL=project.module.js.map