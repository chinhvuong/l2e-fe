import React, { useMemo } from 'react'
import Address from './address'
import Info from './info'
import Order from './order'
import { dataCustomerDetail } from '@/data/data-customer'
import ArrowRight from '@/public/svgs/arrow-right.svg'
import { useTransHook } from '@/locales/hooks'
import './styles.scss'
import Note from './note'

const CustomerDetail = () => {
    const { t } = useTransHook()

    const customerInfo = useMemo(() => {
        const {
            name,
            totalOrder,
            cumulativeRevenue,
            lastOrderDate,
            avgOrderPrice,
            avatar,
        } = dataCustomerDetail
        return {
            name,
            totalOrder,
            cumulativeRevenue,
            lastOrderDate,
            avgOrderPrice,
            avatar,
        }
    }, [])

    return (
        <div className="mb-10">
            <div className="heading--wrap flex justify-between mb-10">
                <div>
                    <h2 className="heading-3 md-heading-collapse mb-3 sm:flex sm:mb-8">
                        <div className="hidden rotate-180 sm:block my-auto pl-2">
                            <ArrowRight />
                        </div>
                        {t('CUSTOMER_DETAIL')}
                    </h2>
                </div>
            </div>
            <div className="mt-10 flex gap-[30px] lg:flex-col lg:gap-6">
                <div className="w-2/3 lg:w-full flex flex-col gap-[30px] lg:gap-6">
                    <Info customerInfo={customerInfo} />
                    <Order orderInfo={dataCustomerDetail.orders} />
                </div>
                <div className="lg:w-full ">
                    <Address
                        address={dataCustomerDetail.address}
                        name={dataCustomerDetail.name}
                    />
                    <div className="mt-7">
                        <Note />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetail
