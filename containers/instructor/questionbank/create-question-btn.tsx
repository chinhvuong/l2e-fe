import { useFormik, FormikProvider, FieldArray } from 'formik'
import { QuestionCreateType } from '@/api/dto/course.dto'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/hooks'
import { UpdateAllQuestionState } from '@/store/question'
const CreateQuestionsContainer = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            questions: [
                {
                    question: '',
                    choices: [''],
                    correctAnswer: 1,
                    courseId: String(router?.query?.slug),
                    medias: [''],
                },
            ],
        },
        onSubmit: (values) => {
            dispatch(UpdateAllQuestionState(values.questions))
            router.push({
                pathname: router.pathname.replace('create', ''),
                query: { ...router.query },
            })
        },
    })
    return (
        <FormikProvider value={formik}>
            <div className="flex w-full">
                <div className="w-1/5"></div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="shadow w-3/5 bg-gray-100 "
                >
                    <FieldArray
                        name="questions"
                        render={(arrayHelpers) => (
                            <div>
                                {formik.values.questions.map(
                                    (question, index) => (
                                        <div key={index} className="pl-10 ">
                                            <div className="flex items-center py-[5px] px-[10px] border-[1px] m-5">
                                                <div className="w-1/4">
                                                    {' '}
                                                    Question Contents :{' '}
                                                </div>
                                                <input
                                                    type="text"
                                                    name={`questions[${index}].question`}
                                                    value={
                                                        formik.values.questions[
                                                            index
                                                        ].question
                                                    }
                                                    className="border-[3px] w-3/4"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                ></input>
                                            </div>
                                            <FieldArray
                                                name={`questions[${index}].choices`}
                                                render={(questionhelper) => (
                                                    <div>
                                                        {formik.values.questions[
                                                            index
                                                        ].choices.map(
                                                            (
                                                                choice,
                                                                indext,
                                                            ) => (
                                                                <div
                                                                    key={indext}
                                                                    className="flex items-center py-[5px] px-[10px] border-[1px] m-5"
                                                                >
                                                                    <div className="w-1/4">
                                                                        {' '}
                                                                        Choice
                                                                        Contents
                                                                        :{' '}
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        name={`questions[${index}].choices[${indext}]`}
                                                                        value={
                                                                            formik
                                                                                .values
                                                                                .questions[
                                                                                index
                                                                            ]
                                                                                .choices[
                                                                                indext
                                                                            ]
                                                                        }
                                                                        className="border-[3px] w-2/4 m-1"
                                                                        onChange={
                                                                            formik.handleChange
                                                                        }
                                                                    ></input>
                                                                    <button
                                                                        className="border-[3px] w-1/4 text-white bg-red-400"
                                                                        type="button"
                                                                        onClick={() =>
                                                                            questionhelper.remove(
                                                                                indext,
                                                                            )
                                                                        }
                                                                    >
                                                                        Remove
                                                                        this
                                                                        choice
                                                                    </button>
                                                                </div>
                                                            ),
                                                        )}
                                                        <div className="flex item-center">
                                                            <div className="w-2/5"></div>
                                                            <button
                                                                className="border-[3px] w-1/4 text-black bg-green-400"
                                                                type="button"
                                                                onClick={() =>
                                                                    questionhelper.push(
                                                                        '',
                                                                    )
                                                                }
                                                            >
                                                                Add More Choice
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                            <div className="flex items-center py-[5px] px-[10px] border-[1px] m-5">
                                                <div className="w-1/4">
                                                    {' '}
                                                    Right Choice Indext :{' '}
                                                </div>
                                                <input
                                                    type="number"
                                                    name={`questions[${index}].correctAnswer`}
                                                    value={
                                                        formik.values.questions[
                                                            index
                                                        ].correctAnswer
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    className="border-[3px] w-3/4"
                                                ></input>
                                            </div>
                                            <FieldArray
                                                name={`questions[${index}].medias`}
                                                render={(mediashelper) => (
                                                    <div>
                                                        {formik.values.questions[
                                                            index
                                                        ].medias.map(
                                                            (
                                                                media,
                                                                newindex,
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        newindex
                                                                    }
                                                                    className="flex items-center py-[5px] px-[10px] border-[1px] m-5"
                                                                >
                                                                    <div className="w-1/4">
                                                                        {' '}
                                                                        Medias
                                                                        Contents
                                                                        :{' '}
                                                                    </div>
                                                                    <input
                                                                        className="border-[3px] w-2/4 m-1"
                                                                        type="text"
                                                                        name={`questions[${index}].medias[${newindex}]`}
                                                                        value={
                                                                            formik
                                                                                .values
                                                                                .questions[
                                                                                index
                                                                            ]
                                                                                .medias[
                                                                                newindex
                                                                            ]
                                                                        }
                                                                        onChange={
                                                                            formik.handleChange
                                                                        }
                                                                    ></input>
                                                                    <button
                                                                        className="border-[3px] w-1/4 text-white bg-red-400"
                                                                        type="button"
                                                                        onClick={() =>
                                                                            mediashelper.remove(
                                                                                newindex,
                                                                            )
                                                                        }
                                                                    >
                                                                        Remove
                                                                        This
                                                                        Medias
                                                                    </button>
                                                                </div>
                                                            ),
                                                        )}
                                                        <div className="flex">
                                                            <div className="w-2/5"></div>
                                                            <button
                                                                className="border-[3px] w-1/4 text-black bg-green-400"
                                                                type="button"
                                                                onClick={() =>
                                                                    mediashelper.push(
                                                                        '',
                                                                    )
                                                                }
                                                            >
                                                                Add Medias
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                            <div className="flex">
                                                <div className="w-2/5"></div>
                                                <button
                                                    className="border-[3px] w-1/4 text-black bg-red-400"
                                                    type="button"
                                                    onClick={() =>
                                                        arrayHelpers.remove(
                                                            index,
                                                        )
                                                    }
                                                >
                                                    Remove This Question
                                                </button>
                                            </div>
                                        </div>
                                    ),
                                )}
                                <div className="flex pl-10">
                                    <div className="w-2/5"></div>
                                    <button
                                        className="border-[3px] w-1/4 text-black bg-green-400"
                                        type="button"
                                        onClick={() =>
                                            arrayHelpers.push({
                                                question: '',
                                                choices: [],
                                                correctAnswer: 0,
                                                courseId: String(
                                                    router?.query?.slug,
                                                ),
                                                medias: [],
                                            })
                                        }
                                    >
                                        Add Question
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                    <div className="flex pr-14 md-3">
                        <div className="w-1/3"></div>
                        <button
                            className="border-[3px] w-2/4 h-10 text-white bg-primary"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </FormikProvider>
    )
}

export default CreateQuestionsContainer
