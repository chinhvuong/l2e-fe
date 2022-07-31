import Button from '@/components/core/button'
import { useTransHook } from '@/locales/hooks'
import React from 'react'
type Props = {
    customerInfo: {
        name: string
        avgOrderPrice: string
        lastOrderDate: string
        cumulativeRevenue: string
        totalOrder: number
        avatar: string
    }
}

const Info = ({ customerInfo }: Props) => {
    const { t } = useTransHook()

    const handleSave = () => {
        console.log('ok')
    }
    return (
        <div className="info-card">
            <div className="flex gap-3 items-center mb-6">
                <div className="flex-shrink-0">
                    <img
                        src={customerInfo.avatar}
                        alt=""
                        className="w-10 rounded"
                    />
                </div>
                <div className="!font-medium">{customerInfo.name}</div>
            </div>
            <div className="flex gap-10">
                <div>
                    <div className="flex flex-center flex-col">
                        <div className="font-normal">
                            {t('AVERAGE_ORDER_VALUE')}
                        </div>
                        <div className="!font-medium">
                            {customerInfo.avgOrderPrice}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-center flex-col">
                        <div className="font-normal">
                            {t('CUMULATIVE_REVENUE')}
                        </div>
                        <div className="!font-medium">
                            {customerInfo.avgOrderPrice}
                        </div>
                        <div className="font-normal">
                            {customerInfo.totalOrder} {t('ORDER')}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-center flex-col">
                        <div className="font-normal">{t('LAST_BOOK_DATE')}</div>
                        <div className="!font-medium">
                            {customerInfo.lastOrderDate}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b-2 border-black-02 my-3 mx-2" />
            <div>
                <div>{t('NOTE')}</div>
                <div className="w-full py-3 px-4 shadow-30 rounded-lg my-3 input-note">
                    <input
                        type="text"
                        placeholder={t('ENTER_NOTE')}
                        className="w-full outline-none"
                    />
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={handleSave}
                        className="!rounded-lg !bg-pri-005 hover:!bg-pri-52 !border-0"
                    >
                        {t('SAVE')}
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Info
