import { useAppDispatch } from '@/hooks'
import { updateFinaltestState } from '@/store/course'
import { QuizDetailType, QuizSelectType } from '@/store/quiz/types'
import Select, { ActionMeta, SingleValue } from 'react-select'

export interface ISelectProps {
    quizzes: QuizSelectType[]
    selectedQuiz: QuizSelectType
}

export interface arrayInput {
    questions?: string[]
}

export default function SingleReactSelect({
    quizzes,
    selectedQuiz,
}: ISelectProps) {
    const dispatch = useAppDispatch()
    function updateQuizzes(
        newValue: SingleValue<QuizSelectType>,
        actionMeta: ActionMeta<QuizSelectType>,
    ): void {
        dispatch(
            updateFinaltestState({
                _id: newValue?.value,
                questions: [
                    {
                        _id: '',
                        question: '',
                        choices: [''],
                        correctAnswer: 0,
                        courseId: '',
                        medias: [''],
                    },
                ],
                courseId: '',
                name: newValue?.label,
                createdAt: '',
                updatedAt: '',
            } as QuizDetailType),
        )
    }
    return (
        <Select
            options={quizzes}
            defaultValue={selectedQuiz}
            onChange={updateQuizzes}
        />
    )
}
