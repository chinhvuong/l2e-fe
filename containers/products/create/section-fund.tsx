import Checkbox from '@/components/core/checkbox'
import { useTransHook } from '@/locales/hooks'
import React, { HTMLAttributes, useEffect, useState } from 'react'

const data = [
    {
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 1,
    },
    {
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 2,
    },
    {
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 3,
    },
    {
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 4,
    },
]
const SectionFund = ({ ...rest }: HTMLAttributes<HTMLDivElement>) => {
    const { t } = useTransHook()
    const [funds, setFunds] = useState<any[]>([])
    const [fund, setFund] = useState(1)

    useEffect(() => {
        setFunds(data)
    }, [])

    const onSelectFund = (val: boolean, key: string | number) => {
        if (val) {
            setFund(Number(key))
        }
    }

    return (
        <div {...rest}>
            <div className="mb-4">
                {t('FUND_CASHOUT')} <span className="text-pri">*</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-[30px] px-6 bg-white/[0.08] rounded-lg shadow-40">
                {funds.length &&
                    funds.map((item, index) => (
                        <label key={index} className="flex gap-4 items-center">
                            <Checkbox
                                onToggle={onSelectFund}
                                keyPass={item.id}
                                checked={fund === item.id}
                            />
                            <img
                                src={item.image}
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <span>{item.name}</span>
                        </label>
                    ))}
            </div>
        </div>
    )
}

export default SectionFund
