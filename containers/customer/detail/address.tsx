import { ICustomerDetail } from '@/contants/interfaces'
import { useTransHook } from '@/locales/hooks'
import React from 'react'

type Props = {
    address: ICustomerDetail['address']
    name: string
}

const Address = ({ address, name }: Props) => {
    const { t } = useTransHook()
    return (
        <div className="info-card">
            <div className="!font-medium">{t('ADDRESS')}</div>
            {address.map((item, index) => (
                <div key={index}>
                    <div className="border-t-2 border-black-02 w-full my-3 mx-1" />
                    <div>{item.location}</div>
                    <div className="flex justify-between items-center my-3">
                        <div>
                            <div>{name},</div>
                            <div>{item.phone}</div>
                        </div>
                        <div className="self-end underline cursor-pointer hover:text-pri-005">
                            {t('EDIT')}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Address
