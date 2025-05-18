'use client'
import { Slider } from '@/components/ui/slider'
import { Gemini } from '@/lib/gemini_service'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { QuizType } from '@/lib/types'

const Home = () => {
  const router = useRouter()
  const [noOfQuestions, setNoOfQuestions] = useState(5)
  const [text, setText] = useState("")
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)

  const getQuiz = async () => {
    if (noOfQuestions < 1) return;
    setLoading(true)
    if (!topic && !text) return;
    const res = await Gemini({ topic: topic || undefined, text: text || undefined, n: noOfQuestions });
    const quiz: QuizType = {
      topic: topic,
      noOfQuestions: noOfQuestions,
      questions: res.questions
    }

    localStorage.setItem("quiz", JSON.stringify(quiz))
    router.push('/quiz')
    setLoading(false)
  }
  return (
    <main className='flex justify-center w-screen bg-transparent h-full items-center p-4'>
      <header className='bg-primary/5 flex items-center h-16 z-50 backdrop-blur-3xl justify-between rounded-xl w-[calc(100%-32px)] top-4 fixed sm:w-[800px] px-8 border border-primary/10'>
        <p className='text-primary font-bold text-2xl'>QuizComp</p>
      </header>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl sm:w-[520px]'>
          <div className='p-5 pt-4 space-y-4'>
            <div className='space-y-1'>
              <p className='text-2xl font-bold'>What&apos;s your Quiz source ?</p>
              <p className='text-foreground/50'>Use a topic or paste your own text — we&apos;ll generate quiz instantly!</p>
            </div>
            <Tabs defaultValue="topic" className="w-full">
              <TabsList className='w-full h-16 *:text-lg mb-4'>
                <TabsTrigger value="topic" className='space-x-1'> <span> 📚 </span> <span>Topic</span></TabsTrigger>
                <TabsTrigger value="text" className='space-x-1'> <span> ✍️ </span> <span>Text</span></TabsTrigger>
              </TabsList>
              <TabsContent value="topic" className=' space-y-2'>
                <Label className='text-base'>Topic</Label>
                <Textarea className='text-lg !bg-background/30 placeholder:text-foreground/20' value={topic} onChange={(v) => setTopic(v.target.value)} placeholder='Nationalism in India' />
              </TabsContent>
              <TabsContent value="text" className=' space-y-2'>
                <Label className='text-base'>Text</Label>
                <Textarea className='text-lg !bg-background/30 placeholder:text-foreground/20' value={text} onChange={(v) => setText(v.target.value)} placeholder='Paste your content here…' />
              </TabsContent>
            </Tabs>
            <Label className='text-base'>No. of Questions</Label>
            <Slider
              max={50}
              min={5}
              value={[noOfQuestions]}
              onValueChange={(v) => setNoOfQuestions(v[0])}
              step={5}
            />
            <p>{noOfQuestions} Questions</p>
            <motion.button
              disabled={topic === "" && text === ""}
              onClick={() => getQuiz()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary/90 w-full text-lg cursor-pointer text-black font-bold h-14 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <p>Generate Quiz</p> <span>
                {loading ? (<Loader2 className=' animate-spin' />) : (<Sparkles fill='#000000' className='size-4' />)}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

export default Home
