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
export interface ILandingPageContainerProps {}

export default function CreateQuestionPageContainer() {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            question: '',
            choices: [''],
            correctAnswer: 1,
            courseId: String(router?.query?.slug),
            medias: [''],
        },
        onSubmit: (values) => {
            console.log(values)
            console.log(clickstep)
            //dispatch(UpdateAllQuestionState(values.questions))
            //router.back()
        },
    })
    const dispatch = useAppDispatch()
    const courseDetail = useAppSelector(getMyCourseDetail)

    return (
        <div>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Title title={'Create Question'} />
                    <div className="py-10 px-14 space-y-5">
                        <div>
                            <div className="font-bold ml-[25px] pb-2">
                                Question Content
                            </div>
                            <div
                                className={`flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] border-black space-x-5`}
                            >
                                <input
                                    type="text"
                                    name="question"
                                    value={formik.values.question}
                                    className="w-full outline-none"
                                    autoComplete="off"
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <FieldArray
                            name={`choices`}
                            render={(questionhelper) => (
                                <div>
                                    {formik.values.choices.map(
                                        (choice, indext) => (
                                            <div
                                                key={indext}
                                                className="space-y-5"
                                            >
                                                <div>
                                                    <div className="font-bold ml-[25px] pb-2">
                                                        Choices Content
                                                    </div>
                                                    <div className="flex">
                                                        <div
                                                            className={`items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] border-black space-x-5 w-4/5`}
                                                        >
                                                            <input
                                                                type="text"
                                                                name={`choices[${indext}]`}
                                                                value={
                                                                    formik
                                                                        .values
                                                                        .choices[
                                                                        indext
                                                                    ]
                                                                }
                                                                className="w-full outline-none"
                                                                autoComplete="off"
                                                                onChange={
                                                                    formik.handleChange
                                                                }
                                                            />
                                                        </div>
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
                                                                choice
                                                            </button>
                                                        </div>
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
                                                questionhelper.push('')
                                            }
                                        >
                                            Add More Choice
                                        </button>
                                    </div>
                                </div>
                            )}
                        />
                        {/* <select
                            name="correctAnswer"
                            value={formik.values.correctAnswer}
                            onChange={formik.handleChange}
                        >
                            {formik.values.choices.map((choice,index) => (
                                <div key={index}>
                                    <option value={index}>{choice}</option>
                                </div>
                            ))}
                        </select> */}
                        <div className="flex space-y-5 my-4">
                            <button className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-primary w-full">
                                ADD QUESTIONS
                            </button>
                        </div>
                    </div>
                </form>
            </FormikProvider>
        </div>
    )
}
