import PlayQuizContent from '@/containers/learn-course/playquiz'
import Layout from '@/layout'
import type { ReactElement } from 'react'

export default function PlayQuiz() {
    return <PlayQuizContent />
}

PlayQuiz.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}
