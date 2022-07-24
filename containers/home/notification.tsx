import React from 'react'
import './style.scss'
import Arrow from '@/public/svgs/arrow.svg'

import { useTransHook } from '@/locales/hooks'
import Link from 'next/link'

type NotiProps = {
    status: number
    time: number
    title: string
    note: string
}
const NotiCard = ({ time, status, title, note }: NotiProps) => {
    const { t } = useTransHook()
    return (
        <div className="mb-6">
            <div className="mb-2 font-medium">{title}</div>
            <div className="text-sm leading-[21px] mb-2 font-normal">
                {note}
            </div>
            <div>
                {status === 1 ? (
                    <span className="text-pri text-xs leading-[18px]">
                        {t('NEW')}
                    </span>
                ) : (
                    <span className="text-pri/50 text-xs leading-[18px]">
                        {t('SEEN')}
                    </span>
                )}
                <span className="relative -top-[3px]">.</span>
                <span className="text-xs leading-[18px]">{time}</span>
            </div>
        </div>
    )
}

const Notification = () => {
    const { t } = useTransHook()

    const data = [
        {
            change: 1,
            quantity: Date.now(),
            title: '! Shop oi chú ý',
            note: 'Shop đã đẩy chiến dịch bán hàng ngày 7.7 chưa',
        },
        {
            change: 1,
            quantity: Date.now(),
            title: '! Shop oi chú ý',
            note: 'Shop đã đẩy chiến dịch bán hàng ngày 7.7 chưa',
        },
        {
            change: 1,
            quantity: Date.now(),
            title: '! Shop oi chú ý',
            note: 'Shop đã đẩy chiến dịch bán hàng ngày 7.7 chưa',
        },
        {
            change: 1,
            quantity: Date.now(),
            title: '! Shop oi chú ý',
            note: 'Shop đã đẩy chiến dịch bán hàng ngày 7.7 chưa',
        },
    ]

    return (
        <div className="shadow-30 rounded-2xl overflow-hidden">
            <div className="bg-pri-17 py-5 px-7 font-medium">
                {t('NOTIFICATION')}
            </div>
            <div className="p-6">
                {data &&
                    data.length &&
                    data.map((item, index) => (
                        <NotiCard
                            key={index}
                            status={item.change}
                            title={item.title}
                            note={item.note}
                            time={item.quantity}
                        />
                    ))}
                <div className="mt-12 mb-[10px] flex justify-end">
                    <Link href="#" passHref>
                        <div className="inline-flex text-second cursor-pointer transition-colors gap-[10px] items-center">
                            <span className="text-inherit">
                                {t('VIEW_ALL')}
                            </span>
                            <Arrow />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Notification
