import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import {
    ErrorMessage,
    FieldArray,
    FieldArrayRenderProps,
    useFormikContext,
} from 'formik'
import { ComponentType, useEffect, useState } from 'react'

export interface IInputProps {
    id?: string
    name?: string
    label?: string
    charLimit?: {
        minLength: number
        maxLength: number
    }
    placeholder?: string
    defaultValue?: string | null
    updateToStore?: ActionCreatorWithPayload<any, string>
    updateInput?: Function
    type?: string
    validate?: boolean
    arrayname: string
    fieldtype?: string | ComponentType<void | FieldArrayRenderProps> | undefined
    index: number
    correctAnswername: string
}

export interface arrayInput {
    questions?: [
        {
            choices?: string[]
            medias?: string[]
            correctAnswer?: number
        },
    ]
}

export default function ChoicesArray({
    arrayname,
    defaultValue,
    index,
    label,
    correctAnswername,
}: IInputProps) {
    const input = defaultValue ?? ''
    const answerPrefix = ['A. ', 'B. ', 'C. ', 'D. ']
    const [isTyped, setIsTyped] = useState(false)
    const context = useFormikContext<arrayInput>()
    useEffect(() => {
        if (!isTyped && input !== '') {
            setIsTyped(true)
        }
    }, [input])
    return (
        <FieldArray
            name={arrayname}
            render={(questionhelper) => (
                <div className="grid grid-cols-2 gap-5">
                    {context.values.questions?.[index].choices?.map(
                        (choice, indext) => (
                            <div className="flex flex-col" key={indext}>
                                <div className="flex space-x-3">
                                    <div className="flex space-x-2 items-center justify-between">
                                        <input
                                            type="radio"
                                            name={correctAnswername}
                                            value={indext}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
                                            autoComplete="off"
                                            onChange={() =>
                                                context.setFieldValue(
                                                    String(correctAnswername),
                                                    parseInt(indext.toString()),
                                                )
                                            }
                                            checked={
                                                context.values.questions?.[
                                                    index
                                                ].correctAnswer === indext
                                            }
                                        />
                                        <div>{answerPrefix[indext]}</div>
                                    </div>
                                    <div
                                        className={`items-center justify-between py-3 rounded-[80px] px-6 border-[1px] border-black space-x-5 w-96`}
                                    >
                                        <input
                                            type="text"
                                            name={arrayname + `[${indext}]`}
                                            value={
                                                context.values.questions?.[
                                                    index
                                                ].choices?.[indext]
                                            }
                                            className="w-full outline-none resize-none"
                                            autoComplete="off"
                                            onChange={context.handleChange}
                                            placeholder="Insert choice"
                                        />
                                    </div>
                                </div>
                                <div className="ml-16 text-sm mt-2 text-red-500">
                                    <ErrorMessage
                                        name={String(arrayname + `[${indext}]`)}
                                    />
                                </div>
                                <div className="w-1/10 space-x-5 mx-[25px] items-center justify-between">
                                    {indext > 3 && (
                                        <button
                                            className="rounded-[80px] px-[25px] border-[1px] text-white bg-red-400"
                                            type="button"
                                            onClick={() =>
                                                questionhelper.remove(indext)
                                            }
                                        >
                                            Remove this choice
                                        </button>
                                    )}
                                </div>
                            </div>
                        ),
                    )}
                    {/* <div className="flex space-y-5 my-4">
                        <button
                            className="rounded-[80px] py-[8px] px-[25px] border-[1px] text-white bg-green-400 w-full"
                            type="button"
                            onClick={() => questionhelper.push('')}
                        >
                            Add More Choice
                        </button>
                    </div> */}
                </div>
            )}
        />
    )
}
