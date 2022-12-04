import RichTextEditor from '@/components/core/rich-text-editor'
import Title from '../components/title'
import { useState, useEffect } from 'react'
import Loading from '@/components/core/animate/loading'
import { useAppSelector } from '@/hooks'
import {
    getMyCourseDetail,
    getCourseDetailState,
} from '@/store/course/selectors'

export interface IMessagesContainerProps {}

export default function MessagesContainer() {
    const courseDetail = useAppSelector(getMyCourseDetail)
    const isNewCourseDetail = useAppSelector(getCourseDetailState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isNewCourseDetail) {
        }
        if (courseDetail._id !== '') {
            setIsLoading(false)
        }
    }, [isNewCourseDetail])
    return (
        <div>
            <Title title={'Course messages'} />
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <Loading />
                </div>
            ) : (
                <div className="py-10 px-14 space-y-5">
                    <div>{`Write messages to your students (optional) that will be sent automatically when they join or complete your course to encourage students to engage with course content. If you do not wish to send a welcome or congratulations message, leave the text box blank.`}</div>
                    <RichTextEditor label="Welcome Message" />
                    <RichTextEditor label="Congratulations Message" />
                </div>
            )}
        </div>
    )
}
