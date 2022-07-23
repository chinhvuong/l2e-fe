import React from 'react'
import Profile from '@/public/svgs/profile-circle.svg'
import { useTransHook } from '@/locales/hooks'

const ToggleLocale = () => {
    const { t } = useTransHook()
    return (
        <div className="flex gap-1 items-center cursor-pointer">
            <Profile className="sm:scale-[1.111]" />
            <span className="sm:hidden text-xs leading-[1] text-white">
                {t('LOGIN_LOGOUT')}
            </span>
        </div>
    )
}

export default ToggleLocale
