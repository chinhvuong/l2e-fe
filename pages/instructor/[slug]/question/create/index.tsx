import CreateQuestionPageContainer from '@/containers/instructor/questionbank/create-question-form'
import CreateQuestionsLayout from '@/layout/questions-layout/create-questions-layout'
import { ReactElement } from 'react'
export default function CreateQuestionPage() {
    return <CreateQuestionPageContainer />
}

CreateQuestionPage.getLayout = function getLayout(page: ReactElement) {
    return <CreateQuestionsLayout>{page}</CreateQuestionsLayout>
}
