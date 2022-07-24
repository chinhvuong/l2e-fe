import React from 'react'
import './style.scss'
import CLTIcon from '@/public/svgs/clipboard-text-gradient.svg'
import Profile from '@/public/svgs/profile-2user-gradient.svg'
import Chart from '@/public/svgs/chart-2-gradient.svg'
import ViewIcon from '@/public/svgs/eye-gradient.svg'
import Increase from '@/public/svgs/increase.svg'
import Decrease from '@/public/svgs/decrease.svg'

import { useTransHook } from '@/locales/hooks'

type StartCard = {
    change: number
    icon: any
    quantity: number
    title: string
    note: string
}
const StatusCard = ({ quantity, icon, change, title, note }: StartCard) => {
    return (
        <div className="relative flex flex-col items-center shadow-40 rounded-2xl p-6 pt-8">
            <span className="text-2xl leading-[29px] font-medium mb-4">
                {quantity}
            </span>
            <div className="inline-flex items-center gap-3 mb-[10px]">
                {icon}
                <span className="font-normal">{title}</span>
            </div>
            <span className="font-normal text-xs text-black-70">{note}</span>

            <div className="absolute top-5 right-3">
                {change > 0 ? <Increase /> : <Decrease />}
            </div>
        </div>
    )
}

const SectionCards = () => {
    const { t } = useTransHook()

    const data = [
        {
            change: 1,
            icon: <CLTIcon />,
            quantity: 10,
            title: t('NEW_ORDERS'),
            note: t('NEW_ORDERS_NOTE'),
        },
        {
            change: 1,
            icon: <Profile />,
            quantity: 10,
            title: t('NEW_CUSTOMERS'),
            note: t('NEW_CUSTOMERS_NOTE'),
        },
        {
            change: -1,
            icon: <Chart />,
            quantity: 10,
            title: t('REVENUE'),
            note: t('REVENUE_NOTE'),
        },
        {
            change: 1,
            icon: <ViewIcon />,
            quantity: 10,
            title: t('VIEW'),
            note: t('VIEW_NOTE'),
        },
    ]

    return (
        <div className="grid grid-cols-4 md:grid-cols-2 gap-5">
            {data &&
                data.length &&
                data.map((item, index) => (
                    <StatusCard
                        key={index}
                        change={item.change}
                        icon={item.icon}
                        title={item.title}
                        note={item.note}
                        quantity={item.quantity}
                    />
                ))}
        </div>
    )
}

export default SectionCards
