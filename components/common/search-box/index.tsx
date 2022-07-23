import Button from '@/components/core/button'
import React, { HTMLAttributes } from 'react'
import SearchIcon from '@/public/svgs/search-icon.svg'
type Props = {
    wraperClasses?: string
}

function Searchbox({
    wraperClasses,
    ...rest
}: Props & HTMLAttributes<HTMLInputElement>) {
    const onChange = (e: any) => {
        console.log(e.target.value)
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
                />

                <Button className="btn-pri py-2 px-4 !rounded-lg">
                    <SearchIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

export default Searchbox
