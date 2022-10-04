import Accordion from '@/components/common/accordion'
import StatusOrder from '@/components/common/status-order'
import { ICustomerDetail } from '@/constants/interfaces'
import { useTransHook } from '@/locales/hooks'
import React from 'react'

type Props = {
    orderInfo: ICustomerDetail['orders']
}

const TitleEl = ({ title, price }: { title: string; price: string }) => (
    <div className="flex flex-col gap-4">
        <div className="title">{title}</div>
        <div className="!font-medium">{price}</div>
    </div>
)

const Order = ({ orderInfo }: Props) => {
    const { t } = useTransHook()
    return (
        <div className="info-card py-6">
            <div className="!font-medium mb-4">{t('ORDER')}</div>
            {orderInfo.map((item, index) => (
                <div key={index}>
                    <div className="border-t-2 border-black-02 w-full my-4 mx-1" />
                    <Accordion
                        leftEl={
                            <TitleEl
                                title={`${t('ORDER_CODE')}: ${item.orderCode}`}
                                price={`${item.price}`}
                            />
                        }
                        rightEl={<div className="mr-5">{item.time}</div>}
                    >
                        <div className="flex justify-between py-4">
                            <div className="flex gap-2">
                                <img
                                    src={item.image}
                                    alt=""
                                    className="w-10 flex-shrink-0"
                                />
                                <div>
                                    <div>{item.name}</div>
                                    <div>x {item.quantity}</div>
                                </div>
                            </div>
                            <div className="px-2 py-2 min-w-[120px]">
                                <StatusOrder type={item.status} />
                            </div>
                        </div>
                    </Accordion>
                </div>
            ))}
        </div>
    )
}

export default Order
