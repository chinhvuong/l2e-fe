import React, { HTMLAttributes } from 'react'

type Props = {
    wraperClasses?: string
    label?: string
    required?: boolean
    value?: string
    extra?: any
}

function TextFieldExtra({
    wraperClasses,
    label,
    required,
    extra,
    ...rest
}: Props & HTMLAttributes<HTMLInputElement>) {
    return (
        <div
            className={`pb-3 pt-[10px] bg-white/[0.08] rounded-lg px-6  shadow-form`}
        >
            <label className={` block font-normal text-sm  ${wraperClasses}`}>
                {label && (
                    <div className="mb-4 md:mb-2">
                        {label}{' '}
                        {required && <span className="text-pri">*</span>}
                    </div>
                )}
                {extra}
                <input
                    type="text"
                    {...rest}
                    // onKeyUp={rest.onKeyUp}
                    className={
                        'outline-0 w-full leading-[1] text-sm placeholder:text-black-50 ' +
                        rest.className
                    }
                />
            </label>
        </div>
    )
}

export default TextFieldExtra
