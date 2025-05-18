'use client'
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

const QuizIndex = () => {
  const params = useParams()
  const index = parseInt(params.index?.toString()!);

  const [quiz, setQuiz] = useState<Quiz>()
  const [selectedOption, setselectedOption] = useState<1 | 2 | 3 | 4>()
  const [finalOption, setfinalOption] = useState<1 | 2 | 3 | 4>()
  const router = useRouter()
  const [timer, setTimer] = useState(60)

  useEffect(() => {
    const storedQuiz = localStorage.getItem("quiz");
    if (!storedQuiz) return router.push("/");
    const quiz: Quiz = JSON.parse(storedQuiz);
    setQuiz(quiz);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          if ((index + 1) !== quiz.questions.length) {
            router.push(`/quiz/question/${index + 1}`)
          } else {
            router.push("/quiz/result")
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);

  }, [])

  const handleNext = async () => {
    setfinalOption(selectedOption)
    if ((index + 1) !== quiz?.questions.length && selectedOption) {
      if (index === 0) {
        const result: Result = {
          attemptedQuestions: [0],
          answers: [{
            questionIndex: index,
            correct: selectedOption === quiz?.questions[index].answer,
            answer: selectedOption,
            marks: parseFloat((5 * (timer / 60)).toFixed(2))
          }],
          totalMarks: parseFloat((5 * (timer / 60)).toFixed(2))
        }
        localStorage.setItem("result", JSON.stringify(result))
      } else {
        const resultData: Result = JSON.parse(localStorage.getItem("result")!)
        const result: Result = {
          attemptedQuestions: [...resultData.attemptedQuestions, index],
          answers: [...resultData.answers, {
            questionIndex: index,
            correct: selectedOption === quiz?.questions[index].answer,
            answer: selectedOption,
            marks: parseFloat((5 * (timer / 60)).toFixed(2))
          }],
          totalMarks: resultData.totalMarks + parseFloat((5 * (timer / 60)).toFixed(2))
        }

        localStorage.setItem("result", JSON.stringify(result))
      }
      setTimer(60);
      router.push(`/quiz/question/${index + 1}`)
    } else {
      const resultData: Result = JSON.parse(localStorage.getItem("result")!)
      const result: Result = {
        attemptedQuestions: [...resultData.attemptedQuestions, index],
        answers: [...resultData.answers, {
          questionIndex: index,
          correct: selectedOption === quiz?.questions[index].answer,
          answer: selectedOption || 1,
          marks: parseFloat((5 * (timer / 60)).toFixed(2))
        }],
        totalMarks: resultData.totalMarks + parseFloat((5 * (timer / 60)).toFixed(2))
      }

      localStorage.setItem("result", JSON.stringify(result))
      router.push("/quiz/result/")
    }
    if (selectedOption === quiz?.questions[index].answer) {
      await confetti({ particleCount: 250, spread: 150, })
    }
  }

  return (
    <main className='flex justify-center w-screen h-full items-center bg-transparent p-5'>
      <header className="flex items-center h-16 justify-between top-4 fixed sm:w-[800px] gap-5 w-[calc(100%-32px)] px-8">
        <div className='w-full h-4 bg-white/10 rounded-full overflow-hidden'>
          <div className='bg-primary h-4 pt-1 px-1 rounded-full' style={{ width: `${(index / quiz?.questions.length!) * 100}%` }}>
            <div className='h-[2px] bg-white/40 w-full rounded-full blur-[1px]'>
            </div>
          </div>
        </div>
        <div className='text-2xl w-12'>
          <span className={timer <= 10 ? "text-red-400" : "text-green-300"}>{timer}s</span>
        </div>

      </header>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:p-8 p-5 shadow-xl sm:w-[560px]'>
          <div className='p-5 pt-5 space-y-4'>
            <p className='sm:text-2xl text-xl font-bold flex gap-2'>{index + 1}. {quiz?.questions[index].question}</p>
            <div className='space-y-3'>
              <motion.button
                onClick={() => setselectedOption(1)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={finalOption !== undefined}
                className={`flex items-center border-2 gap-2 justify-start px-6 cursor-pointer w-full py-3 ${selectedOption === 1 && finalOption === undefined && 'bg-white/15 border-white/20'} rounded-xl text-lg shadow-lg ${finalOption === 1 ? (finalOption === quiz?.questions[index].answer ? 'bg-green-500/10 border-green-300/20' : 'bg-red-500/10 border-red-300/20') : 'bg-white/5'}`}
              >
                <p>A. {quiz?.questions[index].option1}</p>
              </motion.button>
              <motion.button
                onClick={() => setselectedOption(2)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={finalOption !== undefined}
                className={`flex items-center border-2 gap-2 justify-start px-6 cursor-pointer w-full py-3 ${selectedOption === 2 && finalOption === undefined && 'bg-white/15 border-white/20'} rounded-xl text-lg shadow-lg ${finalOption === 2 ? (finalOption === quiz?.questions[index].answer ? 'bg-green-500/10 border-green-300/20' : 'bg-red-500/10 border-red-300/20') : 'bg-white/5'}`}
              >
                <p>B. {quiz?.questions[index].option2}</p>
              </motion.button>
              <motion.button
                onClick={() => setselectedOption(3)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={finalOption !== undefined}
                className={`flex items-center border-2 gap-2 justify-start px-6 cursor-pointer w-full py-3 ${selectedOption === 3 && finalOption === undefined && 'bg-white/15 border-white/20'} rounded-xl text-lg shadow-lg ${finalOption === 3 ? (finalOption === quiz?.questions[index].answer ? 'bg-green-500/10 border-green-300/20' : 'bg-red-500/10 border-red-300/20') : 'bg-white/5'}`}
              >
                <p>C. {quiz?.questions[index].option3}</p>
              </motion.button>
              <motion.button
                onClick={() => setselectedOption(4)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={finalOption !== undefined}
                className={`flex items-center border-2 gap-2 justify-start px-6 cursor-pointer w-full py-3 ${selectedOption === 4 && finalOption === undefined && 'bg-white/15 border-white/20'} rounded-xl text-lg shadow-lg ${finalOption === 4 ? (finalOption === quiz?.questions[index].answer ? 'bg-green-500/10 border-green-300/20' : 'bg-red-500/10 border-red-300/20') : 'bg-white/5'}`}
              >
                <p>D. {quiz?.questions[index].option4}</p>
              </motion.button>
            </div>


            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNext()}
              disabled={selectedOption === undefined || finalOption !== undefined}
              className="bg-primary hover:bg-primary/90 flex items-center gap-2 justify-center cursor-pointer w-full text-black font-bold h-16 rounded-xl text-lg shadow-lg"
            >
              <p>Next</p>
              <ArrowRight className='size-4' />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

export default QuizIndex