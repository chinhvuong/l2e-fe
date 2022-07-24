import React, { HTMLAttributes } from 'react'

type Props = {
    wraperClasses?: string
    label?: string
    required?: boolean
}

function TextArera({
    wraperClasses,
    label,
    required,
    ...rest
}: Props & HTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div className={``}>
            <label className={` block font-normal text-sm  ${wraperClasses}`}>
                {label && (
                    <div className="mb-4 md:mb-2">
                        {label}{' '}
                        {required && <span className="text-pri">*</span>}
                    </div>
                )}
                <textarea
                    {...rest}
                    className={
                        'outline-0 w-full text-sm leading-[1] bg-white/[0.08] rounded-lg px-6 py-4 shadow-form placeholder:text-black-50 h-[200px] ' +
                        rest.className
                    }
                ></textarea>
                {/* <textarea  {...rest} className={'outline-0 w-full text-sm leading-[1] bg-white/[0.08] rounded-lg px-6 py-4 shadow-40 placeholder:text-black-50 ' + rest.className}   >

                </textarea> */}
            </label>
        </div>
    )
}

export default TextArera
