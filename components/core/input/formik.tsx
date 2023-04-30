import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { ErrorMessage, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'

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
    validate?: boolean
    widtharray?: boolean
    index: number
}

export interface arrayInput {
    questions?: [
        {
            choices?: string[]
            medias?: string[]
            correctAnswer: number
            question: string
        },
    ]
}

export default function FormikInput({
    widtharray,
    name,
    label,
    charLimit,
    placeholder,
    defaultValue,
    validate = false,
    index,
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
        <div>
            {label && <div className="font-bold ml-[25px] pb-2">{label}</div>}
            <div
                className={`flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] ${
                    validate && input === '' && isTyped
                        ? 'border-red-500'
                        : 'border-black'
                } space-x-5 ${widtharray ? 'w-4/5' : 'w-full'}`}
            >
                <input
                    type="text"
                    name={name}
                    value={context.values.questions?.[index].question}
                    className="w-full outline-none"
                    autoComplete="off"
                    onChange={context.handleChange}
                    placeholder={placeholder}
                />
            </div>
            {validate && (
                <div className="ml-[25px] text-sm mt-1 text-red-500">
                    <ErrorMessage name={String(name)} />
                </div>
            )}
        </div>
    )
}
