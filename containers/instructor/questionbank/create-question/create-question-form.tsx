import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Title from '@/containers/create-course/components/title'
import { useFormik, FormikProvider, FieldArray } from 'formik'
import { AddAllQuestionState } from '@/store/questions'
import { useRouter } from 'next/router'
import FormikInput from '@/components/core/input/formik'
import ChoicesArray from '@/components/core/input/formikarray'
import FormikSelect from '@/components/core/select/formik'
import MediaArray from '@/components/core/input/mediaformik'
import { COURSE_ID } from '@/constants/localStorage'
import useAPI from '@/api/hooks/useAPI'
import { InstructorAPI } from '@/api/api-path'
import * as yup from 'yup'
export interface ILandingPageContainerProps {}
import { getQuestionDetailInfo } from '@/store/course/question/selectors'
import { getMyCourseDetail } from '@/store/course/selectors'
export default function CreateQuestionPageContainer() {
    const router = useRouter()
    const [courseId, setCourseId] = useState<string>('')
    const detailQuestion = useAppSelector(getQuestionDetailInfo)
    const detailCourse = useAppSelector(getMyCourseDetail)
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
                router.push({
                    pathname: router.pathname.replace('create', ''),
                    query: { ...router.query },
                })
            },
        })
    const { mutate: updateQuestion, isLoading: isLoadingUpdateQuestion } =
        useAPI.put(InstructorAPI.EDIT_QUESTION + '/' + detailQuestion._id, {
            onError: (errors) => {
                console.log(errors)
            },
            onSuccess: (response) => {
                router.push({
                    pathname: router.pathname.replace('update', ''),
                    query: { ...router.query },
                })
            },
        })
    const formik = useFormik({
        initialValues: {
            questions: [
                {
                    question: detailQuestion.question,
                    choices: detailQuestion.choices,
                    correctAnswer: detailQuestion.correctAnswer,
                    courseId: detailCourse._id,
                    medias: detailQuestion.medias,
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
                createQuestions(values.questions)
            }
        },
    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (router?.query?.slug !== null) {
            if (router?.query?.slug !== courseId) {
                setCourseId(String(localStorage.getItem(COURSE_ID)))
            }
        }
        if (detailQuestion._id) {
            setEdit(true)
        }
    }, [courseId, detailQuestion])
    return (
        <div>
            {!isEdit ? (
                <LoadingScreen isLoading={isLoadingCreateQuestion} />
            ) : (
                <LoadingScreen isLoading={isLoadingUpdateQuestion} />
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
                                                    title={'Edit Question '}
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
                                                />
                                                <MediaArray
                                                    arrayname={`questions[${index}].medias`}
                                                    index={index}
                                                    name="medias"
                                                    label="Medias Content"
                                                />
                                                <FormikSelect
                                                    index={index}
                                                    name={`questions[${index}].correctAnswer`}
                                                    label="Correct Answer"
                                                />
                                                {index > 0 && !isEdit && (
                                                    <button
                                                        className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-red-400 w-full"
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        REMOVE QUESTIONS
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
                                                    choices: [''],
                                                    correctAnswer: 0,
                                                    courseId: courseId,
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
                        {isEdit ? 'EDIT QUESTION' : 'CREATE QUESTIONS'}
                    </button>
                </form>
            </FormikProvider>
        </div>
    )
}
