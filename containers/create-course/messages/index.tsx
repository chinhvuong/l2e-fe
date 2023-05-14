import RichTextEditor from '@/components/core/rich-text-editor'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getMyCourseDetail } from '@/store/course/selectors'
import { updateGlobalLoadingState } from '@/store/user'
import { useEffect, useState } from 'react'
import Title from '../components/title'

export interface IMessagesContainerProps {}

export default function MessagesContainer() {
    const courseDetail = useAppSelector(getMyCourseDetail)
    const [isLoading, setIsLoading] = useState(true)
    const [welcomeMessage, setWelcomeMessage] = useState<string>('')
    const [congratulationMessage, setCongratulationMessage] =
        useState<string>('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (courseDetail._id !== '') {
            setIsLoading(false)
        }
    }, [courseDetail._id])

    useEffect(() => {
        dispatch(updateGlobalLoadingState(isLoading))
    }, [isLoading])

    return (
        <div>
            <Title title={'Course messages'} />
            {!isLoading && (
                <div className="py-10 px-14 under_xl:py-5 under_xl:px-7 space-y-5">
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
