'use client'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { Check, Crosshair, SkipForward, X } from 'lucide-react'
import { QuizType, ResultType } from '@/lib/types'

const Result = () => {
    const [result, setResult] = useState<ResultType>()
    const [quiz, setQuiz] = useState<QuizType>()

    useEffect(() => {
        const result: ResultType = JSON.parse(localStorage.getItem("result")!)
        setResult(result)
        const quiz: QuizType = JSON.parse(localStorage.getItem("quiz")!)
        setQuiz(quiz)

        confetti({ spread: 200, particleCount: 300, ticks: 400, zIndex: 50 })
    }, [])

    if (!quiz || !result) {
        return null
    } else {
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
                            <div className='space-y-1'>
                                <p className='text-2xl font-bold flex items-center gap-2'>Result Summary</p>
                            </div>
                            <div className='w-full bg-white/10 border-2 rounded-md px-5 py-3 space-y-1 flex gap-6'>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <p className='text-foreground/70'>Score</p>
                                    <motion.p
                                        className='text-2xl text-nowrap'
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {result?.totalMarks.toFixed(2)} / {quiz?.questions.length! * 5}
                                    </motion.p>

                                    {/* <p className='text-2xl'></p> */}
                                </motion.div>
                                <div className='flex gap-1 flex-wrap p-2'>
                                    {Array.from({ length: quiz?.noOfQuestions! }).map((_, index) => (
                                        <div key={index} className={`size-5 text-xs flex items-center justify-center border rounded-xs ${result?.attemptedQuestions.includes(index) ? result.answers.filter(a => a.questionIndex === index)[0].correct ? 'bg-green-500/50 text-green-300 border-green-500/50' : 'bg-red-500/50 text-red-300 border-red-500/60' : 'bg-white/10 text-white/70 border-white/10'}`}>{result?.attemptedQuestions.includes(index) ? result.answers.filter(a => a.questionIndex === index)[0].correct ? 'C' : 'I' : 'S'}</div>
                                    ))}
                                </div>

                            </div>
                            <div className='flex gap-4 w-full'>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className='bg-green-500/10 px-5 py-3 w-full border-2 border-green-300/20 rounded-md space-y-1'>
                                    <p className='text-green-300/70 text-lg'>Correct</p>
                                    <p className='text-2xl text-green-300 flex gap-3 items-center'><Check className='border-2 rounded-full size-7 p-1 border-green-300/40' /> {result?.answers.filter(a => a.correct).length || 0}/{quiz?.questions.length}</p>
                                    <p></p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className='bg-red-500/10 px-5 py-3 w-full border-2 border-red-300/20 rounded-md space-y-1'>
                                    <p className='text-red-300/70 text-lg'>Incorrect</p>
                                    <p className='text-2xl text-red-300 flex gap-3 items-center'><X className='border-2 rounded-full size-7 p-1 border-red-300/40' /> {result?.answers.filter(a => !a.correct).length || 0}/{quiz?.questions.length}</p>
                                </motion.div>

                            </div>
                            <div className='flex gap-4 w-full'>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className='w-full bg-white/10 border-2 rounded-md px-5 py-3 space-y-1'>
                                    <p className='text-foreground/70'>Skipped</p>
                                    <p className='text-2xl flex gap-3 items-center'><SkipForward className='border-2 rounded-full size-7 p-1.5 border-white/40' /> {(quiz?.noOfQuestions || 0) - (result?.attemptedQuestions?.length || 0)}/{quiz?.questions.length}</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className='bg-blue-500/10 px-5 py-3 w-full border-2 border-blue-300/20 rounded-md space-y-1'>
                                    <p className='text-blue-300/70 text-lg'>Accuracy</p>
                                    <p className='text-2xl text-blue-300 flex gap-3 items-center'><Crosshair className='size-6 border-blue-300/40' /> {
                                        result?.answers.length
                                            ? `${Math.round((result.answers.filter(a => a.correct).length / result.answers.length) * 100)}%`
                                            : '0%'
                                    }</p>
                                </motion.div>

                            </div>
                        </div>
                    </div>

                </motion.div>
            </main >
        )
    }
}

export default Result
