import Button from '@/components/core/button'
import { useTransHook } from '@/locales/hooks'
import React from 'react'

const UserInfo = () => {
    const { t } = useTransHook()

    return (
        <div className="border-b border-dashed border-black/[0.16] flex flex-col items-center">
            <img
                className="w-[100px] h-[100px] sm:w-[86px] sm:h-[86px] mb-6"
                src={'/images/avt.png'}
                alt=""
                draggable={false}
            />
            <div className="mb-4">Nguyễn Đức Anh</div>
            <Button className="mb-5 !py-[6px] !px-[18px] border !border-black-20 !text-black-20 !hover:text-black-20 !font-normal !rounded-[4px] !bg-white !text-sm !leading-[15px]">
                {t('LOGOUT')}
            </Button>
        </div>
    )
}

export default UserInfo
