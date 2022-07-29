import React from 'react'
import './style.scss'
import SectionCards from './section-cards'
import OrderStatics from './order-statics'
import Funds from './funds'
import TopSale from './top-sale'
import Notifications from './notification'
import ArrowRight from '@/public/svgs/arrow-right.svg'
import { handleGoBack } from '@/utils/helpers'
import { useTransHook } from '@/locales/hooks'

const HomePageContainer = () => {
    const { t } = useTransHook()
    return (
        <div className="mb-8">
            <div>
                <h2 className="heading-3 md-heading-collapse mb-3 sm:flex sm:mb-8">
                    <div
                        className="hidden rotate-180 sm:block my-auto pl-2"
                        onClick={handleGoBack}
                    >
                        <ArrowRight />
                    </div>
                    {t('DASHBOARD')}
                </h2>
                <div className="text-sm leading-6 mb-6 sm:hidden">
                    {t('ALL_ORDERS')} 30
                </div>
            </div>
            <SectionCards />
            <div className="mt-10 flex gap-[30px] lg:flex-col lg:gap-6">
                <div className="w-2/3 lg:w-full flex flex-col gap-[30px] lg:gap-6">
                    <OrderStatics />
                    <Funds />
                    <TopSale />
                </div>
                <div className="lg:w-full">
                    <Notifications />
                </div>
            </div>
        </div>
    )
}

export default HomePageContainer
