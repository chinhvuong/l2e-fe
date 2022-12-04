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
    type,
}: IInputProps) {
    const dispatch = useAppDispatch()
    const [input, setInput] = useState(defaultValue ?? '')

    useEffect(() => {
        updateCard(input)
    }, [input])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
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
            {label && <div className="font-bold ml-[10px] pb-2">{label}</div>}
            <div className="flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] border-black space-x-5">
                <input
                    type={type ?? 'text'}
                    name="name"
                    value={input}
                    minLength={charLimit?.minLength}
                    maxLength={charLimit?.maxLength}
                    placeholder={placeholder}
                    className="w-full outline-none"
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                <div className={`${!charLimit?.maxLength && 'hidden'}`}>
                    {getInputCharLeft()}
                </div>
            </div>
        </div>
    )
}
