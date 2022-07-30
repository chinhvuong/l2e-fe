import React, { HTMLAttributes } from 'react'

type Props = {
    wraperClasses?: string
    label?: string
    required?: boolean
    value?: string
    name?: string
}

function TextField({
    wraperClasses,
    label,
    required,
    ...rest
}: Props & HTMLAttributes<HTMLInputElement>) {
    return (
        <div className={``}>
            <label className={` block font-normal text-sm  ${wraperClasses}`}>
                {label && (
                    <div className="mb-4 md:mb-2">
                        {label}{' '}
                        {required && <span className="text-pri">*</span>}
                    </div>
                )}
                <input
                    type="text"
                    {...rest}
                    className={
                        'outline-0 w-full text-sm leading-[1] bg-white/[0.08] rounded-lg px-6 py-4 shadow-form placeholder:text-black-50 ' +
                        rest.className
                    }
                />
            </label>
        </div>
    )
}

export default TextField
