import { useState } from 'react'

export interface IInputProps {
    label?: string
    charLimit?: {
        minLength: number
        maxLength: number
    }
    placeholder?: string
    index: number
}

export default function Input(props: IInputProps) {
    const [input, setInput] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const getInputCharLeft = () => {
        return props.charLimit?.maxLength
            ? props.charLimit?.maxLength - input.length
            : 0
    }

    return (
        <div className="space-y-3">
            {props.label && (
                <div className="font-bold ml-[10px]">{props.label}</div>
            )}
            <div className="flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] border-black space-x-5">
                <input
                    type="text"
                    name="name"
                    value={input}
                    minLength={props.charLimit?.minLength}
                    maxLength={props.charLimit?.maxLength}
                    placeholder={props.placeholder}
                    className="w-full outline-none"
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                <div className={`${!props.charLimit?.maxLength && 'hidden'}`}>
                    {getInputCharLeft()}
                </div>
            </div>
        </div>
    )
}
