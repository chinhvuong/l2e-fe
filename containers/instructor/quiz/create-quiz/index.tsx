import { useEffect, useState } from 'react'
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
import {
    UpdateQuestionsFromQuizState,
    UpdateQuestionsListForQuizState,
} from '@/store/quiz'

export interface ILandingPageContainerProps {}
import * as yup from 'yup'
import {
    getQuizDetailInfo,
    getQuestionsForQuiz,
    getQuestionsIdFromQuiz,
} from '@/store/quiz/selectors'
export default function CreateQuizPageContainer() {
    const router = useRouter()
    const [courseId, setCourseId] = useState<string>('')
    const [isEdit, setEdit] = useState<boolean>(false)
    const { mutate: getQuestionsList, isLoading: isLoadingQuestionsList } =
        useAPI.getMutation(
            InstructorAPI.GET_QUESTIONS + '?courseId=' + courseId,
            {
                onError: () => {},
                onSuccess: (response) => {
                    dispatch(UpdateQuestionsListForQuizState(response?.data))
                    if (!isEdit) {
                        dispatch(
                            UpdateQuestionsFromQuizState([response?.data?.[0]]),
                        )
                    }
                },
            },
        )
    const { mutate: createQuiz, isLoading: isLoadingCreateQuiz } = useAPI.post(
        InstructorAPI.CREAT_QUIZ,
        {
            onError: () => {},
            onSuccess: (response) => {
                // router.push({
                //     pathname: router.pathname.replace('quiz', 'question'),
                //     query: { ...router.query },
                // })
            },
        },
    )
    const detailQuiz = useAppSelector(getQuizDetailInfo)
    const { mutate: updateQuiz, isLoading: isLoadingUpdateQuiz } = useAPI.put(
        InstructorAPI.CREAT_QUIZ + '/' + detailQuiz._id,
        {
            onError: (errors) => {
                console.log(errors)
            },
            onSuccess: (response) => {
                router.push({
                    pathname: router.pathname.replace('update', ''),
                    query: { ...router.query },
                })
            },
        },
    )
    const questionsData = useAppSelector(getQuestionsForQuiz)
    const questionsId = useAppSelector(getQuestionsIdFromQuiz)
    const schema = yup.object().shape({
        questions: yup
            .array()
            .of(yup.string().min(1, 'too short'))
            .required('Must have questions') // these constraints are shown if and only if inner constraints are satisfied
            .min(1, 'Quiz has at least one question'),
        name: yup.string().required('Quiz must have a name'),
    })
    const formik = useFormik({
        initialValues: {
            questions: questionsId,
            courseId: detailQuiz.courseId,
            name: detailQuiz.name,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values)
            if (isEdit) {
                updateQuiz(values)
            } else {
                createQuiz(values)
            }
        },
    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (detailQuiz._id) {
            setEdit(true)
        }
        if (localStorage.getItem(COURSE_ID) !== null) {
            if (localStorage.getItem(COURSE_ID) !== courseId) {
                setCourseId(String(localStorage.getItem(COURSE_ID)))
            } else {
                getQuestionsList({})
            }
        }
    }, [courseId])
    return (
        <div>
            <LoadingScreen isLoading={isLoadingQuestionsList} />
            {!isEdit ? (
                <LoadingScreen isLoading={isLoadingCreateQuiz} />
            ) : (
                <LoadingScreen isLoading={isLoadingUpdateQuiz} />
            )}
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Title title={'Create Question'} />
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
                        <FieldArray
                            name="questions"
                            render={(questionhelper) => (
                                <div>
                                    {formik.values.questions?.map(
                                        (question, indext) => (
                                            <div
                                                key={indext}
                                                className="space-y-5"
                                            >
                                                <div>
                                                    <div className="font-bold ml-[25px] pb-2">
                                                        Question For Quiz
                                                    </div>
                                                    <div className="flex">
                                                        <div
                                                            className={`flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] space-x-5 w-4/5`}
                                                        >
                                                            <Field
                                                                as="select"
                                                                name={`questions.[${indext}]`}
                                                                onChange={
                                                                    formik.handleChange
                                                                }
                                                            >
                                                                {questionsData.map(
                                                                    (
                                                                        question,
                                                                        index,
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                index
                                                                            }
                                                                            value={
                                                                                question._id
                                                                            }
                                                                        >
                                                                            {
                                                                                question.question
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </Field>
                                                        </div>
                                                        <div className="ml-[25px] text-sm mt-1 text-red-500">
                                                            <ErrorMessage
                                                                name={`questions[${indext}]`}
                                                            />
                                                        </div>
                                                        {indext > 0 && (
                                                            <div className="w-1/5  space-x-5 mx-[25px]  items-center justify-between">
                                                                <button
                                                                    className="rounded-[80px] px-[25px] border-[1px] text-white bg-red-400"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        questionhelper.remove(
                                                                            indext,
                                                                        )
                                                                    }
                                                                >
                                                                    Remove this
                                                                    question
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                    <div className="flex space-y-5 my-4">
                                        <button
                                            className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-green-400 w-full"
                                            type="button"
                                            onClick={() =>
                                                questionhelper.push(
                                                    questionsData?.[0]._id,
                                                )
                                            }
                                        >
                                            Add More Questions
                                        </button>
                                    </div>
                                </div>
                            )}
                        />
                        <div className="flex space-y-5 my-4">
                            <button
                                type="submit"
                                className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-primary w-full"
                            >
                                {isEdit ? 'EDIT QUIZ' : 'CREATE QUIZ'}
                            </button>
                        </div>
                    </div>
                </form>
            </FormikProvider>
        </div>
    )
}
