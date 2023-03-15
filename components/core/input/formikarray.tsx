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
}

export interface arrayInput {
    questions?: [
        {
            choices?: string[]
            medias?: string[]
        },
    ]
}

export default function ChoicesArray({
    arrayname,
    defaultValue,
    index,
    label,
}: IInputProps) {
    const input = defaultValue ?? ''
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
                <div>
                    {context.values.questions?.[index].choices?.map(
                        (choice, indext) => (
                            <div key={indext} className="space-y-5">
                                <div>
                                    {label && (
                                        <div className="font-bold ml-[25px] pb-2">
                                            {label}
                                        </div>
                                    )}
                                    <div className="flex">
                                        <div
                                            className={`items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] border-black space-x-5 w-4/5`}
                                        >
                                            <input
                                                type="text"
                                                name={arrayname + `[${indext}]`}
                                                value={
                                                    context.values.questions?.[
                                                        index
                                                    ].choices?.[indext]
                                                }
                                                className="w-full outline-none"
                                                autoComplete="off"
                                                onChange={context.handleChange}
                                            />
                                        </div>
                                        <div className="ml-[25px] text-sm mt-1 text-red-500">
                                            <ErrorMessage
                                                name={String(
                                                    arrayname + `[${indext}]`,
                                                )}
                                            />
                                        </div>
                                        <div className="w-1/5  space-x-5 mx-[25px]  items-center justify-between">
                                            {indext > 3 && (
                                                <button
                                                    className="rounded-[80px] px-[25px] border-[1px] text-white bg-red-400"
                                                    type="button"
                                                    onClick={() =>
                                                        questionhelper.remove(
                                                            indext,
                                                        )
                                                    }
                                                >
                                                    Remove this choice
                                                </button>
                                            )}
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
                            onClick={() => questionhelper.push('')}
                        >
                            Add More Choice
                        </button>
                    </div>
                </div>
            )}
        />
    )
}
