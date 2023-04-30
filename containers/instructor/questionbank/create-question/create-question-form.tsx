import { InstructorAPI } from '@/api/api-path'
import { QuestionCreateType } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import FormikInput from '@/components/core/input/formik'
import ChoicesArray from '@/components/core/input/formikarray'
import { COURSE_ID } from '@/constants/localStorage'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import {
    FieldArray,
    FieldArrayRenderProps,
    FormikProvider,
    useFormik,
} from 'formik'
import { noop } from 'lodash'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import * as yup from 'yup'
import { QuestionBankTitle } from '..'
import AddMoreButton from '@/components/core/button/add-button'

export interface ICreateQuestionFormProps {
    changeMode: Dispatch<SetStateAction<QuestionBankTitle>>
}

export default function CreateQuestionForm({
    changeMode,
}: ICreateQuestionFormProps) {
    const router = useRouter()
    const [courseId, setCourseId] = useState<string>('')
    const { questionDetail, getQuestionsList } = useCreateCourseContext()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const schema = yup.object().shape({
        questions: yup
            .array()
            .of(
                yup.object().shape({
                    question: yup
                        .string()
                        .min(1, 'too short')
                        .required('Required'), // these constraints take precedence
                    correctAnswer: yup.number(),
                    choices: yup
                        .array()
                        .of(
                            yup
                                .string()
                                .min(1, 'too short')
                                .max(100, 'too long'),
                        )
                        .required('Required'),
                }),
            )
            .required('Must have questions') // these constraints are shown if and only if inner constraints are satisfied
            .min(1, 'Minimum of 1 questions'),
    })
    const { mutate: createQuestions, isLoading: isLoadingCreateQuestion } =
        useAPI.post(InstructorAPI.CREATE_QUESTIONS, {
            onError: () => {},
            onSuccess: () => {
                getQuestionsList({})
                formik.resetForm()
                changeMode(QuestionBankTitle.LIST)
            },
        })
    const { mutate: updateQuestion, isLoading: isLoadingUpdateQuestion } =
        useAPI.put(InstructorAPI.EDIT_QUESTION + '/' + questionDetail._id, {
            onError: noop,
            onSuccess: () => {
                getQuestionsList({})
                formik.resetForm()
                changeMode(QuestionBankTitle.LIST)
            },
        })
    const formik = useFormik({
        initialValues: {
            questions: [
                {
                    question: questionDetail.question,
                    choices: questionDetail.choices,
                    correctAnswer: questionDetail.correctAnswer,
                    medias: questionDetail.medias,
                },
            ],
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (isEdit) {
                updateQuestion({
                    question: values.questions?.[0].question,
                    choices: values.questions?.[0].choices,
                    correctAnswer: values.questions?.[0].correctAnswer,
                    medias: values.questions?.[0].medias,
                })
            } else {
                const listQuestions: QuestionCreateType[] = []
                values.questions.forEach((question) => {
                    listQuestions.push({
                        question: question.question,
                        choices: question.choices,
                        correctAnswer: question.correctAnswer,
                        medias: question.medias,
                        courseId: courseId,
                    })
                })
                createQuestions(listQuestions)
            }
        },
        enableReinitialize: true,
    })

    const handleAddMoreQuestion = (arrayHelpers: FieldArrayRenderProps) => {
        arrayHelpers.push({
            question: '',
            choices: ['', '', '', ''],
            correctAnswer: 0,
            medias: [''],
        })
    }

    useEffect(() => {
        if (router?.query?.slug !== null) {
            if (router?.query?.slug !== courseId) {
                setCourseId(String(localStorage.getItem(COURSE_ID)))
            }
        }
        if (questionDetail._id !== '') {
            setIsEdit(true)
        } else {
            setIsEdit(false)
        }
    }, [courseId, questionDetail])
    return (
        <>
            <LoadingScreen
                isLoading={isLoadingCreateQuestion || isLoadingUpdateQuestion}
            />
            <div className="px-10 py-5">
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <FieldArray
                            name="questions"
                            render={(arrayHelpers) => (
                                <div className="space-y-5">
                                    {formik.values.questions.map(
                                        (question, index) => (
                                            <div key={index}>
                                                <div className="space-y-5">
                                                    <FormikInput
                                                        name={`questions[${index}].question`}
                                                        index={index}
                                                        label={`Question ${
                                                            index + 1
                                                        }`}
                                                        placeholder="Insert your question."
                                                    />
                                                    <div>
                                                        <div className="font-bold ml-[25px] pb-2">
                                                            Choices
                                                        </div>
                                                        <ChoicesArray
                                                            arrayname={`questions[${index}].choices`}
                                                            index={index}
                                                            label="Choices"
                                                            correctAnswername={`questions[${index}].correctAnswer`}
                                                        />
                                                    </div>
                                                    {/* <MediaArray
                                                                arrayname={`questions[${index}].medias`}
                                                                index={index}
                                                                name="medias"
                                                                label="Medias Content"
                                                            /> */}
                                                    {/* {index > 0 &&
                                                                !isEdit && (
                                                                    <button
                                                                        className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-red-400 w-full"
                                                                        onClick={() =>
                                                                            arrayHelpers.remove(
                                                                                index,
                                                                            )
                                                                        }
                                                                    >
                                                                        REMOVE
                                                                        QUESTIONS
                                                                    </button>
                                                                )} */}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                    {!isEdit && (
                                        <AddMoreButton
                                            onClick={() =>
                                                handleAddMoreQuestion(
                                                    arrayHelpers,
                                                )
                                            }
                                            label="Add question"
                                        />
                                    )}
                                </div>
                            )}
                        />
                        <div className="flex justify-end space-x-5 my-6">
                            <Button
                                outline
                                onClick={() =>
                                    changeMode(QuestionBankTitle.LIST)
                                }
                            >
                                <div className="font-medium">Cancel</div>
                            </Button>
                            <button
                                type="submit"
                                className="rounded-[80px] py-3 px-8 border text-white bg-primary enabled:hover:bg-primary-hover"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </FormikProvider>
            </div>
        </>
    )
}
