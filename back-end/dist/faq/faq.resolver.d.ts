import { FAQInput } from './faq.input';
import { FaqService } from './faq.service';
import { FAQ } from './faq.entity';
export declare class FaqResolver {
    private faqService;
    constructor(faqService: FaqService);
    getHi(): Promise<string>;
    writeAQuestion(questionInput: FAQInput): Promise<FAQ>;
    writeAnswer(answerInput: FAQInput): Promise<boolean>;
    deleteQuestions(project_name: string): Promise<boolean>;
    getFaqs(): Promise<FAQ[]>;
}
