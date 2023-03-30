import { useAppDispatch } from '@/hooks'
import { updateFinaltestState } from '@/store/course'
import { QuizSelectType } from '@/store/quiz/types'
import { useState } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'

export interface ISelectProps {
    quizzes: QuizSelectType[]
}

export interface arrayInput {
    questions?: string[]
}

export default function SingleReactSelect({ quizzes }: ISelectProps) {
    const [selectedOption, setSelectedOption] = useState(quizzes?.[0])
    const dispatch = useAppDispatch()
    function updateQuizzes(
        newValue: SingleValue<QuizSelectType>,
        actionMeta: ActionMeta<QuizSelectType>,
    ): void {
        setSelectedOption(newValue as QuizSelectType)
        dispatch(updateFinaltestState(newValue?.value as string))
    }
    return (
        <Select
            options={quizzes}
            defaultValue={selectedOption}
            onChange={updateQuizzes}
        />
    )
}
