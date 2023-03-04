import { InstructorAPI } from '@/api/api-path'
import { CoursePreview } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import { COURSE_ID } from '@/constants/localStorage'
import Router from 'next/router'
import { useState } from 'react'

type Props = {
    course: CoursePreview
}
const MyCourseCard = ({ course }: Props) => {
    const [sendApprove, setSendApprove] = useState(false)

    const handleRequestApprove = async (id: string) => {
        requestApprove({ id, notes: [] })
    }

    const { mutate: requestApprove, isLoading: isLoadingRequestApprove } =
        useAPI.post(InstructorAPI.REQUEST_APPROVE, {
            onSuccess(response) {
                setSendApprove(true)
            },
            onError(error) {
                setSendApprove(true)
            },
        })

    const goToUpdateCoursePage = () => {
        localStorage.setItem(COURSE_ID, course._id)
        Router.push(`/update-course/${course._id}/landing-page`)
    }
    const goToQuestionPage = () => {
        console.log(course._id)
        localStorage.setItem(COURSE_ID, course._id)
        Router.push(`instructor/${course._id}/question/`)
    }

    return (
        <>
            <LoadingScreen isLoading={isLoadingRequestApprove} />
            {/* <div className={`flex justify-end gap-4 text-white mt-4`}>
                <Button
                    className="flex gap-4 p-1 text-sm"
                    onClick={() => goToQuestionPage()}
                >
                    <span>Question Bank</span>
                </Button>
            </div> */}
        </>
    )
}

export default MyCourseCard
