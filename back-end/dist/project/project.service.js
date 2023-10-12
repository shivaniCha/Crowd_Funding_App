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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("@nestjs/axios");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const nodemailer_1 = require("nodemailer");
const project_entity_1 = require("./project.entity");
const user_service_1 = require("../user/user.service");
const rxjs_1 = require("rxjs");
const faq_service_1 = require("../faq/faq.service");
const FormData = require("form-data");
let ProjectService = class ProjectService {
    constructor(projectRepository, userService, httpService, faqService) {
        this.projectRepository = projectRepository;
        this.userService = userService;
        this.httpService = httpService;
        this.faqService = faqService;
    }
    async getProjects() {
        const projects = await this.projectRepository.find();
        if (projects) {
            return projects;
        }
    }
    async createProject(createProjectInput) {
        const { project_name, target_amount, username, catagory, description, end_date, image, } = createProjectInput;
        const user = await this.userService.getUserByUsername(username);
        if (user) {
            const project = await this.projectRepository.create({
                project_id: (0, uuid_1.v4)(),
                target_amount,
                project_name,
                username,
                end_date,
                image,
                catagory,
                likes: 0,
                pledges: 0,
                comments: [],
                description: description ? description : '',
                pledge_amount: 0,
            });
            if (project) {
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
                    to: `${project.username}`,
                    subject: 'Project Creation Success!',
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
                    <h1>Greetings! ${user.user_name}</h1>
                  </div>
                  <div class="container">
                    <p>
                      <b>
                          The Project ${project.project_name} was created successfully with your username ${user.username}. You can find it in the catagory of ${project.catagory}!
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
                        console.log('Email Sent To Resgistered User For Project Creation');
                    }
                });
                return await this.projectRepository.save(project);
            }
            else {
                throw new Error('Project Was Not Created!');
            }
        }
        else {
            throw new Error(`User with Username ${username} Not Found`);
        }
    }
    async getAllProjectsOfAUser(username) {
        const user = await this.userService.getUserByUsername(username);
        if (user) {
            const projects = await this.projectRepository.find({
                where: { username },
            });
            if (projects) {
                return projects;
            }
        }
        else {
            throw new Error(`Cannot Find Registered User With Username ${username}`);
        }
    }
    async getProjectByProjectName(project_name) {
        return await this.projectRepository.findOne({ where: { project_name } });
    }
    async pledgeAProject(pledgeAProject) {
        const { pledge_amount, project_name, username } = pledgeAProject;
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw new Error('User Not Registered! Please Log In!');
        }
        if (user) {
            const project = await this.getProjectByProjectName(project_name);
            if (!project) {
                throw new Error(`Project With Name ${project_name} Was Not Found`);
            }
            if (username === project.username) {
                throw new Error('You cannot donate for your own project!');
            }
            const project_owner = await this.userService.getUserByUsername(project.username);
            const amt = project.pledge_amount + pledge_amount;
            await this.projectRepository.update(project._id, {
                pledge_amount: amt,
                pledges: project.pledges + 1,
            });
            const curr = await this.getProjectByProjectName(project_name);
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
                to: `${project.username}`,
                subject: 'Someone Just Pledged On Your Project!',
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
                  <h1>Greetings! ${project_owner.user_name}</h1>
                </div>
                <div class="container">
                  <p>
                    <b>
                        Your Project ${project.project_name} was just Pledged with an amount of ${pledge_amount}!
                        Your Total Pledge Amount Now is: ${curr.pledge_amount}! Congrats!
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
                    console.log('Email For Pleadge To Owner');
                }
            });
            mailTransporter.sendMail({
                from: `${process.env.USER}`,
                to: `${user.username}`,
                subject: 'Thanks For The Pledge!',
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
                  <h1>Greetings! ${user.user_name}</h1>
                </div>
                <div class="container">
                  <p>
                    <b>
                        Your Pledge Of Amount ${pledge_amount} Was Very Much Appreciated By ${project_owner.user_name}!<br/>
                        Please feel free to get connected with him! @${project_owner.username}
                        Thanks Again!
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
                    console.log('Email For Pleadge To Donater');
                }
            });
            return curr;
        }
    }
    async deleteProjectOfUser(deleteProject) {
        const { project_name, username } = deleteProject;
        const project = await this.getProjectByProjectName(project_name);
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw new Error(`Username ${username} Not Found!`);
        }
        if (!project) {
            throw new Error(`Project ${project_name} Not Found!`);
        }
        if (project.username === user.username) {
            const result = await this.projectRepository.delete(project._id);
            const users = await this.userService.getUsers();
            users.map(async (use) => {
                if (use.bookmarks.includes(project_name)) {
                    await this.userService.removeBookMark(use.username, project_name);
                }
                if (use.likedProjects.includes(project_name)) {
                    await this.userService.removeProject(use.username, project_name);
                }
            });
            await this.faqService.deleteQuestions(project_name);
            return result.affected > 0;
        }
        else {
            throw new Error('You cannot delete a project you do not own!');
        }
    }
    async endTime() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const now = `${year}-${month}-${day}`;
        const approaching = await this.projectRepository.find({
            where: {
                end_date: now,
            },
        });
        if (approaching.length === 0) {
        }
        else {
            console.log(approaching);
        }
    }
    async uploadPic(imageData) {
        const formdata = new FormData();
        formdata.append('image', imageData);
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post('https://api.imgbb.com/1/upload?key=1840b60299242baf7a13502ebcd3c889', formdata)
            .pipe((0, rxjs_1.catchError)((error) => {
            throw error;
        })));
        return data.data.image.url;
    }
    async comment(commentInp) {
        const { comment, project_name, username } = commentInp;
        const user = await this.userService.getUserByUsername(username);
        if (user) {
            const project = await this.projectRepository.findOne({
                where: { project_name },
            });
            if (project) {
                await this.projectRepository.update(project._id, {
                    comments: [...project.comments, comment],
                });
                return true;
            }
            else {
                throw new Error('Project With Project Name ' + project_name + ' Not Found');
            }
        }
        else {
            throw new Error('User With Username ' + username + ' Not Found');
        }
    }
    async getAllProjectsByCatagory(catagory) {
        if (catagory.trim().length === 0) {
            return await this.projectRepository.find();
        }
        else {
            return await this.projectRepository.find({ where: { catagory } });
        }
    }
    async likeProject(project_name, username) {
        const project = await this.getProjectByProjectName(project_name);
        const user = await this.userService.getUserByUsername(username);
        if (user) {
            if (user.likedProjects.includes(project.project_name)) {
                await this.projectRepository.update(project._id, {
                    likes: project.likes - 1,
                });
                await this.userService.insertLikedProject(user.username, project.project_name);
                return true;
            }
            else {
                await this.projectRepository.update(project._id, {
                    likes: project.likes + 1,
                });
                await this.userService.insertLikedProject(user.username, project.project_name);
                return true;
            }
        }
        else {
            throw new Error('User With Username ' + username + ' Not Found');
        }
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => faq_service_1.FaqService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        axios_1.HttpService,
        faq_service_1.FaqService])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map