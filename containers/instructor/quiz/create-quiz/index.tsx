import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Title from '@/containers/create-course/components/title'
import {
    useFormik,
    FormikProvider,
    FieldArray,
    ErrorMessage,
    Field,
} from 'formik'
import { useRouter } from 'next/router'
import { COURSE_ID } from '@/constants/localStorage'
import useAPI from '@/api/hooks/useAPI'
import { InstructorAPI } from '@/api/api-path'
import * as yup from 'yup'
import QuestionsListModal from '@/components/core/modal/formik-select-questions-modal'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'

interface QuizModal {
    showModal: boolean
    OpenModal: Dispatch<SetStateAction<boolean>>
}
export default function CreateQuizModal({ showModal, OpenModal }: QuizModal) {
    const { isLoading, questionListsDetail, quizDetail, getQuizzesList } =
        useCreateCourseContext()
    const [courseId, setCourseId] = useState<string>('')
    const [isEdit, setEdit] = useState<boolean>(false)
    const { mutate: createQuiz, isLoading: isLoadingCreateQuiz } = useAPI.post(
        InstructorAPI.CREAT_QUIZ,
        {
            onError: () => {},
            onSuccess: (response) => {
                getQuizzesList({})
                OpenModal(false)
                formik.resetForm()
            },
        },
    )
    const { mutate: updateQuiz, isLoading: isLoadingUpdateQuiz } = useAPI.put(
        InstructorAPI.CREAT_QUIZ + '/' + quizDetail._id,
        {
            onError: (errors) => {
                console.log(errors)
            },
            onSuccess: (response) => {
                getQuizzesList({})
                OpenModal(false)
                formik.resetForm()
            },
        },
    )
    const schema = yup.object().shape({
        questions: yup
            .array()
            .of(
                yup.object().shape({
                    _id: yup.string().min(1, 'too short').required('Required'),
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
            .required('Quiz must have questions') // these constraints are shown if and only if inner constraints are satisfied
            .min(1, 'Quiz have at least 1 question'),
        name: yup.string().required('Quiz must have a name'),
    })
    const formik = useFormik({
        initialValues: {
            name: quizDetail.name,
            questions: quizDetail.questions || [],
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: (values) => {
            const questionsIds: string[] = []
            values.questions.forEach((question) => {
                if (question._id) {
                    questionsIds.push(question._id)
                }
            })
            if (isEdit) {
                updateQuiz({
                    questions: questionsIds,
                    name: values.name,
                    courseId: courseId,
                })
            } else {
                createQuiz({
                    questions: questionsIds,
                    name: values.name,
                    courseId: courseId,
                })
            }
        },
    })
    useEffect(() => {
        if (localStorage.getItem(COURSE_ID) !== null) {
            if (localStorage.getItem(COURSE_ID) !== courseId) {
                setCourseId(String(localStorage.getItem(COURSE_ID)))
            }
        }
        if (quizDetail._id) {
            setEdit(true)
        } else {
            setEdit(false)
        }
    }, [courseId, quizDetail])
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
                        <LoadingScreen
                            isLoading={
                                isLoadingCreateQuiz || isLoadingUpdateQuiz
                            }
                        />
                        <FormikProvider value={formik}>
                            <form onSubmit={formik.handleSubmit}>
                                <Title title={'Create Quiz'} />
                                <div className="py-10 px-14 space-y-5">
                                    <div>
                                        <div className="font-bold ml-[25px] pb-2">
                                            Quiz Name
                                        </div>
                                        <div
                                            className={`flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] border-black space-x-5`}
                                        >
                                            <input
                                                type="text"
                                                name="name"
                                                value={formik.values.name}
                                                className="w-full outline-none"
                                                autoComplete="off"
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="ml-[25px] text-sm mt-1 text-red-500">
                                            <ErrorMessage name="name" />
                                        </div>
                                    </div>
                                    <QuestionsListModal
                                        questionsList={questionListsDetail}
                                        isEdit={isEdit}
                                    />
                                    <div className="ml-[25px] text-sm mt-1 text-red-500">
                                        <ErrorMessage name="questions" />
                                    </div>
                                    {formik?.values.questions?.map(
                                        (question, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] ${
                                                    question.question !== ''
                                                        ? 'border-black'
                                                        : 'hidden'
                                                } space-x-5`}
                                            >
                                                {question.question}
                                            </div>
                                        ),
                                    )}
                                    <div className="flex space-y-5 my-4">
                                        <button
                                            type="submit"
                                            className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-primary w-full"
                                        >
                                            {isEdit
                                                ? 'EDIT QUIZ'
                                                : 'CREATE QUIZ'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </FormikProvider>
                    </div>
                </>
            ) : null}
        </>
    )
}
