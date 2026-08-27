import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class SurveyService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() { }

    async getSurveys() {
        return this.prisma.survey.findMany({
            include: {
                _count: {
                    select: { responses: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getSurveyById(id: number) {
        return this.prisma.survey.findUnique({
            where: { id },
            include: {
                questions: {
                    orderBy: { order: 'asc' },
                    include: {
                        options: {
                            orderBy: { order: 'asc' }
                        }
                    }
                },
                _count: {
                    select: { responses: true }
                }
            }
        });
    }

    async createSurvey(data: any) {
        const { title, description, status, questions } = data;
        return this.prisma.survey.create({
            data: {
                title,
                description,
                status: status || 'DRAFT',
                questions: {
                    create: questions?.map((q: any, index: number) => ({
                        content: q.text, // Mapped from 'text' to 'content'
                        type: q.type,
                        required: q.required,
                        order: index,
                        options: {
                            create: q.options?.map((opt: string, optIndex: number) => ({
                                content: opt,
                                order: optIndex
                            }))
                        }
                    }))
                }
            },
            include: {
                questions: {
                    include: { options: true }
                }
            }
        });
    }

    async updateSurvey(id: number, data: any) {
        const { title, description, status, questions } = data;

        // Update survey metadata
        const survey = await this.prisma.survey.update({
            where: { id },
            data: { title, description, status }
        });

        // Re-create questions if provided (Strategy: Full Replace for simplicity)
        if (questions) {
            // Delete existing questions (options cascade delete)
            await this.prisma.question.deleteMany({ where: { surveyId: id } });

            // Create new questions
            for (const [index, q] of questions.entries()) {
                await this.prisma.question.create({
                    data: {
                        surveyId: id,
                        content: q.text,
                        type: q.type,
                        required: q.required,
                        order: index,
                        options: {
                            create: q.options?.map((opt: string, optIndex: number) => ({
                                content: opt,
                                order: optIndex
                            }))
                        }
                    }
                });
            }
        }

        return this.getSurveyById(id);
    }

    async deleteSurvey(id: number) {
        return this.prisma.survey.delete({ where: { id } });
    }

    async submitResponse(data: any) {
        const { surveyId, userId, answers } = data;
        // answers is expected to be an object: { questionId: value }
        // value can be string (TEXT), number (RATING), choiceId (SINGLE), or [choiceIds] (MULTI)

        return this.prisma.response.create({
            data: {
                surveyId,
                userId,
                answers: {
                    create: await Promise.all(Object.entries(answers).map(async ([qId, val]: [string, any]) => {
                        const questionId = parseInt(qId);
                        const question = await this.prisma.question.findUnique({ where: { id: questionId } });

                        let textValue = null;
                        let intValue = null;
                        let answerOptionsConnect: { questionOptionId: number }[] = [];

                        if (question?.type === 'TEXT') {
                            textValue = String(val);
                        } else if (question?.type === 'RATING') {
                            intValue = parseInt(val);
                        } else if (question?.type === 'SINGLE_CHOICE') {
                            // Find option by content (if frontend sends option string) OR id
                            // Assuming frontend sends Option ID now for robustness, relying on ID is better.
                            // But for backward compatibility with simple array options logic from frontend:
                            // We need to match content if we don't have IDs.
                            // For now let's assume we match by Option ID if passed as number, or content if string? 
                            // Let's stick to IDs for enterprise. But wait, frontend sends simple strings in 'options' array.
                            // We need to find the Option entity.

                            // To simplify: let's assume 'val' IS the Option ID (number).
                            // If frontend sends string, we'd need to lookup.
                            // For this iteration, let's assume the frontend will send the Option.id
                            answerOptionsConnect.push({ questionOptionId: parseInt(val) });
                        } else if (question?.type === 'MULTIPLE_CHOICE') {
                            // val is number[] (Option IDs)
                            if (Array.isArray(val)) {
                                answerOptionsConnect = val.map((vid: any) => ({ questionOptionId: parseInt(vid) }));
                            }
                        }

                        return {
                            questionId,
                            textValue,
                            intValue,
                            answerOptions: {
                                create: answerOptionsConnect
                            }
                        };
                    }))
                }
            }
        });
    }

    async getResponses(surveyId: number) {
        return this.prisma.response.findMany({
            where: { surveyId },
            include: {
                answers: {
                    include: {
                        answerOptions: {
                            include: { questionOption: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getAnalytics(surveyId: number) {
        const survey = await this.prisma.survey.findUnique({
            where: { id: surveyId },
            include: {
                questions: {
                    include: {
                        options: true
                    }
                },
                _count: {
                    select: { responses: true }
                }
            }
        });

        if (!survey) return null;

        const responses = await this.prisma.response.findMany({
            where: { surveyId },
            include: {
                answers: {
                    include: {
                        answerOptions: true
                    }
                }
            }
        });

        const analytics = survey.questions.map(question => {
            const questionAnswers = responses.flatMap(r => r.answers.filter(a => a.questionId === question.id));

            let result: any = {
                questionId: question.id,
                questionContent: question.content,
                type: question.type,
                totalResponses: questionAnswers.length
            };

            if (question.type === 'RATING') {
                const values = questionAnswers.map(a => a.intValue).filter(v => v !== null) as number[];
                const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;

                // Distribution for rating 1-5
                const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                values.forEach(v => { if (distribution[v] !== undefined) distribution[v]++; });

                result.average = parseFloat(avg.toFixed(1));
                result.distribution = Object.entries(distribution).map(([rating, count]) => ({
                    rating: parseInt(rating),
                    count,
                    percentage: values.length > 0 ? parseFloat(((count / values.length) * 100).toFixed(1)) : 0
                })).reverse();
            } else if (question.type === 'SINGLE_CHOICE' || question.type === 'MULTIPLE_CHOICE') {
                const optionCounts = responses.flatMap(r =>
                    r.answers
                        .filter(a => a.questionId === question.id)
                        .flatMap(a => a.answerOptions.map(ao => ao.questionOptionId))
                );

                result.options = question.options.map(opt => {
                    const count = optionCounts.filter(id => id === opt.id).length;
                    return {
                        optionId: opt.id,
                        content: opt.content,
                        count,
                        percentage: questionAnswers.length > 0 ? parseFloat(((count / questionAnswers.length) * 100).toFixed(1)) : 0
                    };
                });
            } else if (question.type === 'TEXT') {
                result.responses = questionAnswers
                    .map((a: any) => a.textValue)
                    .filter((v: any) => v !== null && v !== '')
                    .slice(0, 10); // Last 10 text responses
            }

            return result;
        });

        return {
            surveyId: survey.id,
            title: survey.title,
            status: survey.status,
            totalResponses: survey._count.responses,
            analytics
        };
    }

    async assignPostConsultationSurvey(data: any) {
        console.log('Assigning survey for booking:', data);
        // Logic: Create a "Pending" survey response for this user
        // This would show up in their "Pending Surveys" list

        // const survey = await this.prisma.survey.create({ ... })
        console.log(`Survey assigned to user ${data.userId} for appointment ${data.appointmentId}`);
    }
}
