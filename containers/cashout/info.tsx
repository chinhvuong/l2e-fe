import React, { useState } from 'react'
import ClockIcon from '@/public/svgs/clock.svg'
import Select from '@/components/core/select'
import { useTransHook } from '@/locales/hooks'

const Info = () => {
    const { t } = useTransHook()
    const [selectItem, setSelectItem] = useState(-1)
    const [selectTitle, setSelectTitle] = useState('')

    const renderItem = (data: string, index: number) => {
        return (
            <div
                key={index}
                className={`select-item-transition ${
                    selectItem === index ? 'bg-pri-17 text-black' : ''
                }`}
                onClick={() => {
                    setSelectItem(index)
                    setSelectTitle(data)
                }}
            >
                {data}
            </div>
        )
    }

    const data = ['abc', 'Tổng quỹ']
    return (
        <div className="py-8">
            <div className="flex">
                <div className="flex items-center py-3 px-4 shadow-30 bg-white rounded-lg ">
                    <ClockIcon />
                    <div className="ml-3"> 03.07.2022, 10:01 AM</div>
                </div>

                <div className="min-w-[200px] ml-6">
                    <Select
                        renderItem={renderItem}
                        data={data}
                        placeholder={'Tong quy'}
                        textShow={selectTitle}
                    />
                </div>
            </div>
            <div className="flex items-center py-3 px-10 shadow-30 bg-white rounded-lg my-6 justify-between">
                <div className="flex flex-col items-center gap-3">
                    <div className="!font-medium">{t('OPENING_BALANCE')}</div>
                    <div className="!font-medium">0</div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="!font-medium">{t('OPENING_BALANCE')}</div>
                    <div className="!font-medium">0</div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="!font-medium">{t('OPENING_BALANCE')}</div>
                    <div className="!font-medium">0</div>
                </div>
            </div>
        </div>
    )
}

export default Info
