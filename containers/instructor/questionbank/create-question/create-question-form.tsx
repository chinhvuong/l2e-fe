import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Title from '@/containers/create-course/components/title'
import { useFormik, FormikProvider, FieldArray } from 'formik'
import { useRouter } from 'next/router'
import FormikInput from '@/components/core/input/formik'
import ChoicesArray from '@/components/core/input/formikarray'
import MediaArray from '@/components/core/input/mediaformik'
import { COURSE_ID, QUESTION_ID } from '@/constants/localStorage'
import useAPI from '@/api/hooks/useAPI'
import { InstructorAPI } from '@/api/api-path'
import * as yup from 'yup'
export interface ILandingPageContainerProps {}
import { useCreateQuestionBankContext } from '../create-quiz-context'
import { QuestionCreateType } from '@/api/dto/course.dto'
import Button from '@/components/core/button'
interface QuestionModal {
    showModal: boolean
    OpenModal: Dispatch<SetStateAction<boolean>>
}
export default function CreateQuestionPageModal({
    showModal,
    OpenModal,
}: QuestionModal) {
    const router = useRouter()
    const [courseId, setCourseId] = useState<string>('')
    const { questionDetail, getQuestionsList } = useCreateQuestionBankContext()
    const [isEdit, setEdit] = useState<boolean>(false)
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
            onSuccess: (response) => {
                getQuestionsList({})
                OpenModal(false)
                formik.resetForm()
            },
        })
    const { mutate: updateQuestion, isLoading: isLoadingUpdateQuestion } =
        useAPI.put(InstructorAPI.EDIT_QUESTION + '/' + questionDetail._id, {
            onError: (errors) => {},
            onSuccess: (response) => {
                getQuestionsList({})
                OpenModal(false)
                formik.resetForm()
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
            console.log(values.questions)
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
    useEffect(() => {
        if (router?.query?.slug !== null) {
            if (router?.query?.slug !== courseId) {
                setCourseId(String(localStorage.getItem(COURSE_ID)))
            }
        }
        if (questionDetail._id) {
            setEdit(true)
        } else {
            setEdit(false)
        }
    }, [courseId, questionDetail])
    return (
        <>
            <div className="flex w-full">
                <div className="inset-10 z-50 w-full h-full bg-white border shadow-xl">
                    {showModal && (
                        <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => OpenModal(false)}
                        >
                            <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 ">
                                X
                            </span>
                        </button>
                    )}
                </div>
            </div>
            {showModal ? (
                <>
                    <div className="inset-10 z-50 w-full h-full bg-white border shadow-xl focus:outline-none">
                        {!isEdit ? (
                            <LoadingScreen
                                isLoading={isLoadingCreateQuestion}
                            />
                        ) : (
                            <LoadingScreen
                                isLoading={isLoadingUpdateQuestion}
                            />
                        )}
                        <FormikProvider value={formik}>
                            <form onSubmit={formik.handleSubmit}>
                                <FieldArray
                                    name="questions"
                                    render={(arrayHelpers) => (
                                        <div>
                                            {formik.values.questions.map(
                                                (question, index) => (
                                                    <div key={index}>
                                                        {!isEdit ? (
                                                            <Title
                                                                title={
                                                                    'Create Question ' +
                                                                    (index + 1)
                                                                }
                                                            />
                                                        ) : (
                                                            <Title
                                                                title={
                                                                    'Edit Question '
                                                                }
                                                            />
                                                        )}
                                                        <div className="py-10 px-14 space-y-5">
                                                            <FormikInput
                                                                name={`questions[${index}].question`}
                                                                index={index}
                                                                label="Question Content"
                                                                placeholder="Insert your question content."
                                                            />
                                                            <ChoicesArray
                                                                arrayname={`questions[${index}].choices`}
                                                                index={index}
                                                                label="Choices Content"
                                                                correctAnswername={`questions[${index}].correctAnswer`}
                                                            />
                                                            <MediaArray
                                                                arrayname={`questions[${index}].medias`}
                                                                index={index}
                                                                name="medias"
                                                                label="Medias Content"
                                                            />
                                                            {index > 0 &&
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
                                                                )}
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                            <div className="flex space-y-5 ">
                                                {!isEdit && (
                                                    <button
                                                        className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-green-400 w-full"
                                                        onClick={() =>
                                                            arrayHelpers.push({
                                                                question: '',
                                                                choices: [
                                                                    '',
                                                                    '',
                                                                    '',
                                                                    '',
                                                                ],
                                                                correctAnswer: 0,
                                                                medias: [''],
                                                            })
                                                        }
                                                    >
                                                        ADD QUESTIONS
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                />
                                <button
                                    type="submit"
                                    className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-primary w-full my-6"
                                >
                                    {isEdit
                                        ? 'EDIT QUESTION'
                                        : 'CREATE QUESTIONS'}
                                </button>
                            </form>
                        </FormikProvider>
                    </div>
                </>
            ) : null}
        </>
    )
}
