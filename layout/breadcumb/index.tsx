import React from 'react'
import Breadcrumb from '@/components/core/breadcrumb'
import { useTransHook } from '@/locales/hooks'

const BreadCrumbWraper = () => {
    const { t } = useTransHook()
    const data = [
        {
            text: t('HOME'),
            href: '/',
        },
        {
            text: t('SHOP_OWNER'),
            href: '/dashboard',
            active: true,
        },
    ]

    return (
        <div className="mt-[21px] mb-[46px]">
            <Breadcrumb data={data} />
        </div>
    )
}

export default BreadCrumbWraper
