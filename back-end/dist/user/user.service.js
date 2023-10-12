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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const nodemailer_1 = require("nodemailer");
const uuid_1 = require("uuid");
const project_service_1 = require("../project/project.service");
let UserService = class UserService {
    constructor(projectService, userRepository) {
        this.projectService = projectService;
        this.userRepository = userRepository;
    }
    async registerUser(createUserInput) {
        const { user_name, username, password } = createUserInput;
        const user = this.userRepository.create({
            user_id: (0, uuid_1.v4)(),
            user_name,
            username,
            likedProjects: [],
            password,
            bookmarks: [],
        });
        await this.userRepository.save(user).catch((error) => {
            throw new Error(error);
        });
        if (user) {
            const mailTransporter = (0, nodemailer_1.createTransport)({
                service: 'gmail',
                host: 'smtp.gmail.com',
                secure: false,
                auth: {
                    user: `${process.env.USER}`,
                    pass: `${process.env.PASS}`,
                },
            });
            mailTransporter.sendMail({
                from: `${process.env.USER}`,
                to: `${user.username}`,
                subject: 'Registered Successfully To CrowdFunding!',
                html: `
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              h1 {
                color: white;
              }
              .container {
                width: 500px;
                margin: 0 auto;
                padding: 20px;
                background-color: #F0EB8D;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .container2 {
                width: 500px;
                margin: 0 auto;
                opacity: 100%;
                padding: 20px;
                background-color: #8F43EE;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
            </style>
          </head>
          <body>
            <div class="container2">
              <h1>Welcome ${user.user_name} To CrowdFunding!</h1>
            </div>
            <div class="container">
              <p>
                <b>
                    Thank you for joining our community. <br/> We are excited to have you on board!<br/>
                    Your Email is: ${user.username}<br/>
                    Your Password is: ${user.password}
                </b>
              </p>
              <p>
                If you have any questions, feel free to reach out to us supportteam@gmail.com
              </p>
           </div>
          </body>
        </html>
        `,
            }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Email Sent To Resgistered User');
                }
            });
            return user;
        }
        else {
            throw new Error('User Not Registered');
        }
    }
    async getUsers() {
        return await this.userRepository.find();
    }
    async getUserByUsername(username) {
        return await this.userRepository.findOne({ where: { username } });
    }
    async getUser(username, password) {
        const user = this.userRepository.findOne({
            where: {
                username,
                password,
            },
        });
        if (user) {
            return user;
        }
    }
    async bookMarkAProject(bookMark) {
        const { username, project_name } = bookMark;
        const user = await this.getUserByUsername(username);
        if (!user) {
            throw new Error('You Should Login First!');
        }
        const project = await this.projectService.getProjectByProjectName(project_name);
        if (!project) {
            throw new Error(`Project ${project_name} Not Found!`);
        }
        if (user.username === project.username) {
            throw new Error('You cannot bookmark owned projects!');
        }
        if (user.bookmarks.includes(project.project_name)) {
            const index = user.bookmarks.indexOf(project_name);
            user.bookmarks.splice(index, 1);
            await this.userRepository.update(user._id, {
                bookmarks: user.bookmarks,
            });
            return true;
        }
        else {
            await this.userRepository.update(user._id, {
                bookmarks: [...user.bookmarks, project.project_name],
            });
            return true;
        }
    }
    async removeBookMark(username, project_name) {
        const user = await this.getUserByUsername(username);
        if (user.bookmarks.includes(project_name)) {
            const index = user.bookmarks.indexOf(project_name);
            user.bookmarks.splice(index, 1);
            await this.userRepository.update(user._id, {
                bookmarks: user.bookmarks,
            });
        }
    }
    async removeProject(username, project_name) {
        const project = await this.projectService.getProjectByProjectName(project_name);
        const user = await this.getUserByUsername(username);
        if (user) {
            await this.userRepository.update(user._id, {
                likedProjects: user.likedProjects.filter((name) => name !== project.project_name),
            });
        }
    }
    async insertLikedProject(username, project_name) {
        const project = await this.projectService.getProjectByProjectName(project_name);
        const user = await this.getUserByUsername(username);
        if (user) {
            if (user.likedProjects.includes(project.project_name)) {
                await this.userRepository.update(user._id, {
                    likedProjects: user.likedProjects.filter((name) => name !== project.project_name),
                });
                return true;
            }
            else {
                await this.userRepository.update(user._id, {
                    likedProjects: [...user.likedProjects, project.project_name],
                });
                return true;
            }
        }
        else {
            return false;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => project_service_1.ProjectService))),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map