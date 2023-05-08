import { useAppDispatch } from '@/hooks'
import {
    updateIntendedLearnersState,
    updateRequirementsState,
    updateWhatYouWillLearnState,
} from '@/store/course/intended-learners'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'

export interface IInputProps {
    id: string
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
    min?: string
    max?: string
}

export default function Input({
    id,
    name,
    label,
    charLimit,
    placeholder,
    defaultValue,
    updateInput,
    updateToStore,
    type = 'text',
    validate = false,
    min,
    max,
}: IInputProps) {
    const dispatch = useAppDispatch()
    const [input, setInput] = useState(defaultValue ?? '')
    const [isTyped, setIsTyped] = useState(false)
    const [prevVal, setPrevVal] = useState<string>('')

    useEffect(() => {
        if (!isTyped && input !== '') {
            setIsTyped(true)
        }
        updateCard(input)
    }, [input])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            const regex = /^[0-9]{0,50}(\.[0-9]{0,2})?$/
            let value = e.target.value

            const removeLeadingZeros = /^0+(?=\d)/
            value = value.replace(removeLeadingZeros, '')

            if (value === '.') {
                value = '0'
            }
            if (!regex.test(value)) {
                value = prevVal
            }
            setPrevVal(value)
            setInput(value)
        } else {
            setInput(e.target.value)
        }
        updateInput && updateInput(e.target.value)
    }

    const getInputCharLeft = () => {
        return charLimit?.maxLength ? charLimit?.maxLength - input.length : 0
    }

    const updateCard = (content: string) => {
        updateToStore &&
            dispatch(
                updateToStore({
                    id: id,
                    content: content,
                }),
            )
        if (name) {
            if (name === 'What you will learn') {
                dispatch(updateWhatYouWillLearnState(true))
            } else if (name === 'Requirements') {
                dispatch(updateRequirementsState(true))
            } else if (name === 'Intended learners') {
                dispatch(updateIntendedLearnersState(true))
            }
        }
    }

    return (
        <div>
            {label && <div className="font-bold ml-[25px] pb-2">{label}</div>}
            <div
                className={`flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] ${
                    validate && input === '' && isTyped
                        ? 'border-red-500'
                        : 'border-black'
                } space-x-5`}
            >
                <input
                    type={'text'}
                    name="name"
                    value={input}
                    minLength={charLimit?.minLength}
                    maxLength={charLimit?.maxLength}
                    placeholder={placeholder}
                    className="w-full outline-none"
                    onChange={handleInputChange}
                    autoComplete="off"
                    min={min}
                    max={max}
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
                    This field is required!
                </div>
            )}
        </div>
    )
}
