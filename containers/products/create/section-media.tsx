import UploadImg from '@/components/common/upload-image'
import { useTransHook } from '@/locales/hooks'
import React from 'react'

const SectionMedia = () => {
    const { t } = useTransHook()

    return (
        <div className="grid grid-cols-3 gap-6 lg:gap-4 w-full">
            <div className="col-span-3">
                <UploadImg
                    iconClass="w-[94px] h-[94px]"
                    label={t('ADD_MAIN_IMAGE')}
                    image={''}
                    onChange={(e) => console.log(e)}
                />
            </div>
            {Array.from(Array(6).keys()).map((item) => (
                <UploadImg
                    key={item}
                    label={`${t('IMAGE')} ${1}`}
                    image={''}
                    onChange={(e) => console.log(e)}
                />
            ))}
        </div>
    )
}

export default SectionMedia
