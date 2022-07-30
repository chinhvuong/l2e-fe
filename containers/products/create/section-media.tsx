import UploadImg from '@/components/common/upload-image'
import { useTransHook } from '@/locales/hooks'
import { updatePhoto } from '@/state/product/productCreateSlice'
import { selectProductMedia } from '@/state/product/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SectionMedia = () => {
    const { t } = useTransHook()
    const photos = useSelector(selectProductMedia)
    const dispatch = useDispatch()

    const onChange = (data: any, index: number) => {
        dispatch(updatePhoto({ index, value: data }))
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-6 lg:gap-4 w-full">
                <div className="col-span-3">
                    <UploadImg
                        iconClass="w-[94px] h-[94px]"
                        label={t('ADD_MAIN_IMAGE')}
                        image={photos[0].url}
                        onChange={(data) => onChange(data, 0)}
                    />
                </div>
                {photos.slice(1).map((item, index) => (
                    <UploadImg
                        key={index}
                        label={`${t('IMAGE')} ${index + 1}`}
                        image={item.url}
                        onChange={(data) => onChange(data, index + 1)}
                    />
                ))}
            </div>
            <div className="text-center mt-10">{t('AT_LEAST_4_PHOTOS')}</div>
        </div>
    )
}

export default SectionMedia
