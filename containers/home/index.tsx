import React from 'react'
import './style.scss'
import SectionCards from './section-cards'
import OrderStatics from './order-statics'
import Funds from './funds'
import TopSale from './top-sale'
import Notifications from './notification'

const HomePageContainer = () => {
    return (
        <div className="mb-8">
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
