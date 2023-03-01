import Hyperlink from '@/containers/create-course/components/hyperlink'
import Input from '@/components/core/input'
import RichTextEditor from '@/components/core/rich-text-editor'
import Select from '@/components/core/select'
import UploadPreview from '@/components/core/upload-preview'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    getMyCourseDetail,
    getCourseDetailState,
} from '@/store/course/selectors'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Title from '@/containers/create-course/components/title'
import { useFormik, FormikProvider, FieldArray } from 'formik'
import { UpdateAllQuestionState } from '@/store/question'
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

export default function CreateQuestionPageContainer() {
    const router = useRouter()
    const schema = yup.object().shape({
        questions: yup
            .array()
            .of(
                yup.object().shape({
                    question: yup
                        .string()
                        .min(10, 'too short')
                        .max(60, 'too long')
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
    const formik = useFormik({
        initialValues: {
            questions: [
                {
                    question: '',
                    choices: ['', '', '', ''],
                    correctAnswer: 1,
                    courseId: String(localStorage.getItem(COURSE_ID)),
                    medias: [''],
                },
            ],
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values.questions)
            dispatch(UpdateAllQuestionState(values.questions))
            // createQuestions(values.questions)
        },
    })
    const dispatch = useAppDispatch()

    return (
        <div>
            <LoadingScreen isLoading={isLoadingCreateQuestion} />
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <FieldArray
                        name="questions"
                        render={(arrayHelpers) => (
                            <div>
                                {formik.values.questions.map(
                                    (question, index) => (
                                        <div key={index}>
                                            <Title
                                                title={
                                                    'Create Question ' +
                                                    (index + 1)
                                                }
                                            />
                                            <div className="py-10 px-14 space-y-5">
                                                <FormikInput
                                                    name={`questions[${index}].question`}
                                                    charLimit={{
                                                        minLength: 10,
                                                        maxLength: 60,
                                                    }}
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
                                                {index > 0 && (
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
                                    <button
                                        className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-green-400 w-full"
                                        onClick={() =>
                                            arrayHelpers.push({
                                                question: '',
                                                choices: [''],
                                                correctAnswer: 0,
                                                courseId: String(
                                                    router?.query?.slug,
                                                ),
                                                medias: [''],
                                            })
                                        }
                                    >
                                        ADD QUESTIONS
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                    <button
                        type="submit"
                        className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-primary w-full my-6"
                    >
                        CONFIRM CREATE QUESTIONS
                    </button>
                </form>
            </FormikProvider>
        </div>
    )
}
