import React from 'react'
import './styles.scss'
import { EStatusOrder } from '@/contants/common'
import { useTransHook } from '@/locales/hooks'

type Props = {
    type: typeof EStatusOrder
    className?: string
}

function StatusOrder({ type, className }: Props) {
    const { t } = useTransHook()

    const index = Object.values(EStatusOrder).indexOf(type as any)

    return (
        <div
            className={`text-sm shadow-sm py-1 rounded-md ${
                Object.keys(EStatusOrder)[index]
            } ${className ? className : ''}`}
        >
            {t(type as unknown as string)}
        </div>
    )
}

export default StatusOrder
