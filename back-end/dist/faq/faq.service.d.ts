import { FAQ } from './faq.entity';
import { Repository } from 'typeorm';
import { FAQInput } from './faq.input';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';
export declare class FaqService {
    private faqRepo;
    private projectService;
    private userService;
    constructor(faqRepo: Repository<FAQ>, projectService: ProjectService, userService: UserService);
    writeAQuestion(questionInput: FAQInput): Promise<FAQ>;
    writeAnswer(answerInput: FAQInput): Promise<boolean>;
    deleteQuestions(project_name: string): Promise<boolean>;
    getFaqs(): Promise<FAQ[]>;
}
