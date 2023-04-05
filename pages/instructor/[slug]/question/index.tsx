import QuestionBankContainers from '@/containers/instructor/questionbank'
import QuestionBankLayout from '@/layout/questions-layout'
import { ReactElement } from 'react'

export default function QuestionBankPage() {
    return <QuestionBankContainers />
}

QuestionBankPage.getLayout = function getLayout(page: ReactElement) {
    return <QuestionBankLayout>{page}</QuestionBankLayout>
}
