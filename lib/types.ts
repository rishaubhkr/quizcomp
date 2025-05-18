export type QuizType = {
    topic?: string;
    text?: string;
    noOfQuestions: number;
    questions: QuestionType[]
}

export type QuestionType = {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: 1 | 2 | 3 | 4;
}

export type ResultType = {
    attemptedQuestions: number[];
    answers: { questionIndex: number, correct: boolean, answer: 1 | 2 | 3 | 4, marks: number }[]
    totalMarks: GLfloat;
}