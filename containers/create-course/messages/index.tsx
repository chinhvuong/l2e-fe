import RichTextEditor from '@/components/core/rich-text-editor'
import Title from '../components/title'
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/hooks'
import {
    getMyCourseDetail,
    getCourseDetailState,
} from '@/store/course/selectors'
import LoadingScreen from '@/components/core/animate/loading-screen'

export interface IMessagesContainerProps {}

export default function MessagesContainer() {
    const courseDetail = useAppSelector(getMyCourseDetail)
    const isNewCourseDetail = useAppSelector(getCourseDetailState)
    const [isLoading, setIsLoading] = useState(true)
    const [welcomeMessage, setWelcomeMessage] = useState<string>('')
    const [congratulationMessage, setCongratulationMessage] =
        useState<string>('')

    useEffect(() => {
        if (isNewCourseDetail) {
        }
        if (courseDetail._id !== '') {
            setIsLoading(false)
        }
    }, [isNewCourseDetail])

    return (
        <div>
            <LoadingScreen isLoading={isLoading} />
            <Title title={'Course messages'} />
            {!isLoading && (
                <div className="py-10 px-14 space-y-5">
                    <div>{`Write messages to your students (optional) that will be sent automatically when they join or complete your course to encourage students to engage with course content. If you do not wish to send a welcome or congratulations message, leave the text box blank.`}</div>
                    <RichTextEditor
                        label="Welcome Message"
                        updateState={setWelcomeMessage}
                    />
                    <RichTextEditor
                        label="Congratulations Message"
                        updateState={setCongratulationMessage}
                    />
                </div>
            )}
        </div>
    )
}
