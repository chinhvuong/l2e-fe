import { InstructorAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import QuestionsListModal from '@/components/core/modal/formik-select-questions-modal'
import { COURSE_ID } from '@/constants/localStorage'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import { ErrorMessage, FormikProvider, useFormik } from 'formik'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import * as yup from 'yup'
import { QuizTitle } from '..'
import { QuestionDetailType } from '@/store/questions/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { noop } from 'lodash'

export interface ICreateQuizFormProps {
    changeMode: Dispatch<SetStateAction<QuizTitle>>
}

export default function CreateQuizForm({ changeMode }: ICreateQuizFormProps) {
    const answerPrefix = ['A. ', 'B. ', 'C. ', 'D. ']
    const { questionListsDetail, quizDetail, getQuizzesList } =
        useCreateCourseContext()
    const [courseId, setCourseId] = useState<string>('')
    const [isEdit, setEdit] = useState<boolean>(false)
    const [showModal, setShowModal] = useState(false)
    const { mutate: createQuiz, isLoading: isLoadingCreateQuiz } = useAPI.post(
        InstructorAPI.CREATE_QUIZ,
        {
            onError: noop,
            onSuccess: () => {
                getQuizzesList({})
                formik.resetForm()
                changeMode(QuizTitle.LIST)
            },
        },
    )
    const { mutate: updateQuiz, isLoading: isLoadingUpdateQuiz } = useAPI.put(
        InstructorAPI.CREATE_QUIZ + '/' + quizDetail._id,
        {
            onError: noop,
            onSuccess: () => {
                getQuizzesList({})
                formik.resetForm()
                changeMode(QuizTitle.LIST)
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
            <LoadingScreen
                isLoading={isLoadingCreateQuiz || isLoadingUpdateQuiz}
            />
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    {questionListsDetail.length > 0 && showModal && (
                        <QuestionsListModal
                            questionsList={questionListsDetail}
                            isEdit={isEdit}
                            setShowModal={setShowModal}
                        />
                    )}
                    <div className="py-5 px-10">
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
                        <button
                            className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 my-5"
                            type="button"
                            onClick={() => setShowModal(true)}
                        >
                            Show Questions List
                        </button>
                        <div className="ml-[25px] text-sm mt-1 text-red-500">
                            <ErrorMessage name="questions" />
                        </div>
                        <div className="space-y-5">
                            {formik?.values.questions?.map(
                                (question, index) => (
                                    <div key={index}>
                                        <div className="px-6">
                                            <h1 className="font-semibold text-lg mb-3">
                                                {`${index + 1}. ` +
                                                    question?.question}
                                            </h1>
                                        </div>
                                        <div className="grid grid-cols-2 gap-5 w-full">
                                            {question?.choices.map(
                                                (choice, choiceIndex) => (
                                                    <div
                                                        key={choiceIndex}
                                                        className={`flex justify-between items-center rounded-[80px] cursor-pointer py-3 px-6 border-2 font-medium ${
                                                            choiceIndex ===
                                                            question?.correctAnswer
                                                                ? `bg-green-400 bg-opacity-10 text-green-400 border-green-400`
                                                                : `text-description border-description`
                                                        }`}
                                                    >
                                                        <span>
                                                            {answerPrefix[
                                                                choiceIndex
                                                            ] + choice}
                                                        </span>
                                                        {choiceIndex ===
                                                            question?.correctAnswer && (
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faCircleCheck
                                                                }
                                                                className="text-[20px] text-green-400 ml-2"
                                                            />
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                        <div className="flex justify-end space-x-5 my-6">
                            <Button
                                outline
                                onClick={() => changeMode(QuizTitle.LIST)}
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
                    </div>
                </form>
            </FormikProvider>
        </>
    )
}
