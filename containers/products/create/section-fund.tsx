import { useTransHook } from '@/locales/hooks'
import React, { HTMLAttributes, useEffect, useState } from 'react'

const data = [
    {
        image: '/images/avt.png',
        name: 'Green Vietnam Fund',
    },
    {
        image: '/images/avt.png',
        name: 'Green Vietnam Fund',
    },
    {
        image: '/images/avt.png',
        name: 'Green Vietnam Fund',
    },
    {
        image: '/images/avt.png',
        name: 'Green Vietnam Fund',
    },
]
const SectionFund = ({ ...rest }: HTMLAttributes<HTMLDivElement>) => {
    const { t } = useTransHook()
    const [funds, setFunds] = useState<any[]>([])

    useEffect(() => {
        setFunds(data)
    }, [])

    return (
        <div {...rest}>
            <div className="mb-4">
                {t('FUND_CASHOUT')} <span className="text-pri">*</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-[30px] px-6  bg-white/[0.08] rounded-lg shadow-40">
                {funds.length &&
                    funds.map((item, index) => (
                        <div key={index}>
                            <span>{item.name}</span>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default SectionFund
