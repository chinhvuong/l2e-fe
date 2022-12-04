import React from 'react'
import Profile from '@/public/svgs/profile-circle.svg'

const ToggleLocale = () => {
    return (
        <div className="flex gap-1 items-center cursor-pointer">
            <Profile className="sm:scale-[1.111]" />
        </div>
    )
}

export default ToggleLocale
