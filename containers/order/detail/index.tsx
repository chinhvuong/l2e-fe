import { useTransHook } from '@/locales/hooks'
import { useRouter } from 'next/router'
// import Select from '@/components/core/select'
import React from 'react'
import ClockIcon from '@/public/svgs/clock.svg'
import TableData from './table-data'
import { dataOrderDetails } from '@/data/data-order'
import Card from '@/components/common/card'
import TickIcon from '@/public/svgs/tick-circle.svg'

const Dettail = () => {
    const router = useRouter()
    console.log(router.query)
    const { t } = useTransHook()
    const { id } = router.query

    return (
        <div>
            <h2 className="heading-3 md-heading-collapse mb-3">
                {t('ORDER_DETAIL')}
            </h2>
            <div className="text-sm leading-6 mb-6">
                {t('ORDER_DETAIL')} ID: {id}
            </div>

            <div className="flex justify-between px-6 py-4 rounded-2xl shadow-30 items-center">
                <div>
                    <div className="flex gap-2 mb-3 items-center text-sm">
                        <ClockIcon />
                        <span className="leading-6 text-sm">
                            {new Date().toTimeString()}
                        </span>
                    </div>
                    <div>
                        {t('ORDER')} ID: {id}
                    </div>
                </div>
                {/* <Select /> */}
            </div>

            <div className="flex gap-[30px] mt-10">
                <div className="w-2/3">
                    <TableData data={dataOrderDetails} />
                    <Card title={t('CHECKOUT_INFO')}>
                        <div className="flex justify-between my-[18px]">
                            <span className="font-medium">
                                {t('TOTAL_MONEY')}
                            </span>
                            <span>{10000000}</span>
                        </div>
                        <div className="flex justify-between mb-[18px]">
                            <span className="font-medium">
                                {t('TRANSPORT')}
                            </span>
                            <span>{10000000}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-medium mt-[18px]">
                            <span>{t('PAYMENT')}</span>
                            <span>{10000000}</span>
                        </div>
                    </Card>
                </div>
                <div className="grow flex flex-col gap-6">
                    <Card title={t('VERIFY_ORDER')}>
                        <div className="flex gap-4 py-4 items-center">
                            <TickIcon />
                            <span>{t('VERIFYED_ORDER_NOTE')}</span>
                        </div>
                    </Card>
                    <Card title={t('CUSTOMER_INFO')}>
                        <div className="flex gap-4 py-4 pb-2 flex-col text-sm">
                            <div>{'Chinh Vuong'}</div>
                            <div>{'email@gmail.com'}</div>
                            <div>{'+0345 789 9999'}</div>
                        </div>
                    </Card>
                    <Card title={t('DELIVER_INFO')}>
                        <div className="py-4 pb-2 text-sm">
                            <div className="text-sm font-medium leading-[15px] mb-[10px]">
                                {t('DELIVERY_ADDRESS')}
                            </div>
                            <div className="text-sm text-[11px] leading-[13px]">
                                {
                                    'Số nhà 18, Ngõ 20 Văn Cao, Phường Liễu Giai, Quận Ba Đình, Hà Nội'
                                }
                            </div>
                        </div>
                        <hr />
                        <div className="py-4 pb-2 text-sm">
                            <div className="text-sm font-medium leading-[15px] mb-[10px]">
                                {t('CUSTOMER_NOTE')}
                            </div>
                            <div className="text-[11px] leading-[13px]">
                                {
                                    'Số nhà 18, Ngõ 20 Văn Cao, Phường Liễu Giai, Quận Ba Đình, Hà Nội'
                                }
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dettail
