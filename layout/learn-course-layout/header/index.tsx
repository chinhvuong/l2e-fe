import { useLearningCourseContext } from '@/containers/learn-course/learning-course-context'
import Logo from '@/layout/main-layout/header/logo'
import { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export interface IHeaderProps {}

export default function Header() {
    const { courseDetail } = useLearningCourseContext()
    const [percentage, setPercentage] = useState(0)
    const [text, setText] = useState('')

    const getProgressBarContent = () => {
        let totalLessons = 0
        let completedLessons = 0
        courseDetail?.sections.forEach((section) => {
            totalLessons += section.lessons.length
            section.lessons.forEach((lesson) => {
                if (lesson.learned) {
                    completedLessons++
                }
            })
        })
        setPercentage((completedLessons * 100) / totalLessons)
        setText(`${completedLessons}/${totalLessons}`)
    }

    useEffect(() => {
        if (courseDetail) {
            getProgressBarContent()
        }
    }, [courseDetail])

    return (
        <div className="flex items-center justify-between bg-black h-[90px] w-full px-5 text-white">
            <div className="flex items-center">
                <Logo darkTheme className="w-[90px]" />
                <div className="ml-6 pl-6 border-l border-border-box text-lg font-medium">
                    {courseDetail?.name ?? ''}
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <CircularProgressbar
                    value={percentage}
                    text={text}
                    className="h-[60px]"
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#07DA63' : '#F48C06',
                        trailColor: '#4d4c4c',
                        textColor: '#FFFFFF',
                    })}
                />
            </div>
        </div>
    )
}
