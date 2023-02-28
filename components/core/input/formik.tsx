import { useAppDispatch } from '@/hooks'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useFormikContext } from 'formik'
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
    type?: string
    validate?: boolean
    widtharray?: boolean
}

export default function FormikInput({
    widtharray,
    id,
    name,
    label,
    charLimit,
    placeholder,
    defaultValue,
    updateInput,
    updateToStore,
    type,
    validate = false,
}: IInputProps) {
    const dispatch = useAppDispatch()
    const [input, setInput] = useState(defaultValue ?? '')
    const [isTyped, setIsTyped] = useState(false)
    const context = useFormikContext<IInputProps>()
    useEffect(() => {
        if (!isTyped && input !== '') {
            setIsTyped(true)
        }
    }, [input])

    const getInputCharLeft = () => {
        return charLimit?.maxLength ? charLimit?.maxLength - input.length : 0
    }

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
                    type={type ?? 'text'}
                    name={name}
                    defaultValue={context.values.name}
                    minLength={charLimit?.minLength}
                    maxLength={charLimit?.maxLength}
                    placeholder={placeholder}
                    className="w-full outline-none"
                    autoComplete="off"
                    onChange={context.handleChange}
                />
                <div className={`${!charLimit?.maxLength && 'hidden'}`}>
                    {getInputCharLeft()}
                </div>
            </div>
            {validate && (
                <div
                    className={`ml-[25px] text-sm mt-1 ${
                        input === '' && isTyped ? 'text-red-500' : 'text-white'
                    }`}
                >
                    Không được để trống!
                </div>
            )}
        </div>
    )
}
