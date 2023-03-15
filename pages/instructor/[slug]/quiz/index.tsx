import CreateQuizPageContainer from '@/containers/instructor/quiz/create-quiz'
import CreateQuestionsLayout from '@/layout/questions-layout/create-questions-layout'
import { ReactElement } from 'react'
export default function CreateQuizPage() {
    return <CreateQuizPageContainer />
}

CreateQuizPage.getLayout = function getLayout(page: ReactElement) {
    return <CreateQuestionsLayout>{page}</CreateQuestionsLayout>
}
