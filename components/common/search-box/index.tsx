import Button from '@/components/core/button'
import React, { HTMLAttributes, useState } from 'react'
import SearchIcon from '@/public/svgs/search-icon.svg'
type Props = {
    wraperClasses?: string
    // eslint-disable-next-line no-unused-vars
    onPressSearch: (text: string) => void
}

function Searchbox({
    wraperClasses,
    onPressSearch,
    ...rest
}: Props & HTMLAttributes<HTMLInputElement>) {
    const [text, setText] = useState('')

    const onChange = (e: any) => {
        setText(e.target.value)
    }

    return (
        <div className={``}>
            <div
                className={`font-normal text-sm flex items-center rounded-lg pl-6 pr-2 py-2 shadow-40-08 bg-white/[0.08] ${wraperClasses}`}
            >
                <input
                    type="text"
                    {...rest}
                    onChange={onChange}
                    className={
                        'outline-0 grow pr-4 text-sm leading-[1]  placeholder:text-black-50 ' +
                        rest.className
                    }
                    value={text}
                />

                <Button
                    className="btn-pri py-2 px-4 !rounded-lg"
                    onClick={() => onPressSearch(text)}
                >
                    <SearchIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

export default Searchbox
