'use client'
import { BookOpen, FileText, Play, Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation';
import { QuizType } from '@/lib/types';

const Quiz = () => {
    const [quiz, setQuiz] = useState<QuizType>()
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const quizData = localStorage.getItem("quiz")
            if (!quizData) {
                router.push("/")
                return
            }
            setQuiz(JSON.parse(quizData))
        }
    }, [router])
    return (
        <main className='flex justify-center w-screen h-full items-center bg-transparent p-5'>
            <header className='bg-primary/5 flex items-center h-16 justify-between rounded-xl top-4 fixed sm:w-[800px] w-[calc(100%-32px)] px-8 border border-primary/10'>
                <p className='text-primary font-bold text-2xl'>QuizComp</p>
            </header>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:p-8 p-5 shadow-xl sm:w-[560px]'>
                    <div className='p-5 pt-5 space-y-4'>
                        <div className='space-y-2'>
                            <p className='text-2xl font-bold flex items-start gap-2'><BookOpen className='w-6 h-6 pt-1' /> {quiz?.topic || quiz?.text}</p>
                            <p className='text-foreground/50 flex items-center gap-1'><Timer className='w-4 h-4' /> 60s / Question</p>
                            <p className='text-foreground/50 flex items-center gap-1'><FileText className='w-4 h-4' /> {quiz?.noOfQuestions} Questions</p>
                            <p className='text-foreground/50'>
                                Total {(quiz?.noOfQuestions ?? 0) * 5} Marks (5 Marks per Question based on answering time)
                            </p>
                        </div>
                        <motion.button
                            onClick={() => router.push("/quiz/question/0")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary hover:bg-primary/90 flex items-center gap-2 justify-center cursor-pointer w-full text-black font-bold h-14 rounded-xl text-lg shadow-lg"
                        >
                            <p>Start Quiz</p>
                            <Play fill='#000000' className='size-4' />
                        </motion.button>

                    </div>
                </div>
            </motion.div>
        </main>
    )
}

export default Quiz
