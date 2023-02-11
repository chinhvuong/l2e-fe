import React, { useMemo } from 'react'
import Breadcrumb from '@/components/core/breadcrumb'
import { useTransHook } from '@/locales/hooks'
import { useRouter } from 'next/router'

const calculate = (path: string, t: any) => {
    const bread: any = {
        orders: {
            text: t('MANAGE_ORDERS'),
            href: '/orders',
            active: false,
        },
        'canceled-orders': {
            text: t('CANCELED_ORDERS'),
            href: '/canceled-orders',
            active: false,
        },
        products: {
            text: t('MANAGE_PRODUCTS'),
            href: '/products',
            active: false,
        },
        'create-product': {
            text: t('ADD_NEW_PRODUCT'),
            href: '/orders',
            active: false,
        },
        customers: {
            text: t('MANAGE_CUSTOMERS'),
            href: '/customers',
            active: false,
        },
        funds: {
            text: t('MANAGE_FUNDS'),
            href: '/funds',
            active: false,
        },
        'shop-records': {
            text: t('MANAGE_SHOP_RECORDS'),
            href: '/shop-records',
            active: false,
        },
        target: {
            text: t('MANAGE_TARGET'),
            href: '/target',
            active: false,
        },

        revenue: {
            text: t('REVENUE_REPORT'),
            href: '/revenue',
            active: false,
        },
    }
    const chunks = path.split('/')
    const data = [
        {
            text: t('HOME'),
            href: '/',
            active: false,
        },
        {
            text: t('SHOP_OWNER'),
            href: '/',
            active: false,
        },
    ]

    for (let i = 0; i < chunks.length; i++) {
        if (chunks[i]) {
            const route = bread[chunks[i]]
            if (route?.text) {
                data.push(route)
            }
        }
    }

    data[data.length - 1].active = true

    return data
}

const BreadCrumbWraper = () => {
    const { t } = useTransHook()
    const router = useRouter()
    const data = useMemo(() => calculate(router.route, t), [router.route])

    return (
        <div className="mt-[21px] mb-[46px]">
            <Breadcrumb data={data} />
        </div>
    )
}

export default BreadCrumbWraper
