import { useAppDispatch, useAppSelector } from '@/hooks'
import { getInputContentCurriculumSection } from '@/store/course/curriculum/selectors'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'

export interface IInputProps {
    id: string
    label?: string
    charLimit?: {
        minLength: number
        maxLength: number
    }
    placeholder?: string
    updateToStore?: ActionCreatorWithPayload<any, string>
}

export default function Input({
    id,
    label,
    charLimit,
    placeholder,
    updateToStore,
}: IInputProps) {
    const dispatch = useAppDispatch()
    const [input, setInput] = useState(
        useAppSelector(getInputContentCurriculumSection(id)),
    )

    useEffect(() => {
        updateCard(input)
    }, [input])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
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
    }

    return (
        <div className="space-y-3">
            {label && <div className="font-bold ml-[10px]">{label}</div>}
            <div className="flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] border-black space-x-5">
                <input
                    type="text"
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
