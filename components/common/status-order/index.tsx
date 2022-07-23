import React from 'react'
import './styles.scss'
import { EStatusOrder } from '@/contants/interfaces'
import { useTransHook } from '@/locales/hooks'

type Props = {
    type: EStatusOrder
    className?: string
}

function StatusOrder({ type, className }: Props) {
    const { t } = useTransHook()
    return (
        <div
            className={`text-sm shadow-sm rounded-md ${EStatusOrder[type]} ${className}`}
        >
            {t(EStatusOrder[type].toUpperCase())}
        </div>
    )
}

export default StatusOrder
