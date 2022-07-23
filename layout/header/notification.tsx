import React from 'react'
import Noti from '@/public/svgs/notification.svg'
import { useTransHook } from '@/locales/hooks'

const Notification = () => {
    const { t } = useTransHook()
    return (
        <div className="flex items-center gap-1 cursor-pointer">
            <Noti className="sm:scale-[1.111]" />
            <span className="sm:hidden leading-[1] text-white text-xs">
                {t('NOTIFICATION')}
            </span>
        </div>
    )
}

export default Notification
