import React from 'react'
import GlobalIcon from '@/public/svgs/global.svg'

const ToggleLocale = () => {
    return (
        <div className="flex gap-1 items-center">
            <GlobalIcon className="sm:scale-[1.111]" />
            <span className="sm:hidden text-xs leading-[1] text-white">
                Tiếng việt
            </span>
        </div>
    )
}

export default ToggleLocale
