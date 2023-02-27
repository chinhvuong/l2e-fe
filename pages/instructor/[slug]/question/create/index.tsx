import CreateQuestionPageContainer from '@/containers/instructor/questionbank/create-question-form'
import CreateCourseLayout from '@/layout/create-course-layout/course-detail'
import { ReactElement } from 'react'
export default function CreateQuestionPage() {
    return <CreateQuestionPageContainer />
}

CreateQuestionPage.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
