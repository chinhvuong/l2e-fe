import { useTransHook } from '@/locales/hooks'
import React from 'react'

const Note = () => {
    const { t } = useTransHook()
    return (
        <div className="info-card">
            <div className="!font-medium">{t('CUSTOMER_NOTE')}</div>
            <div className="mt-3">Noji dung...</div>
        </div>
    )
}
export default Note
