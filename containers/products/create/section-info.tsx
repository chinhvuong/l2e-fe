import TextArera from '@/components/core/textarea'
import TextField from '@/components/core/textfield'
import { useTransHook } from '@/locales/hooks'
import { updateGeneralInfo } from '@/state/product/productCreateSlice'
import { selectProductGeneralInfo } from '@/state/product/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SectionInfo = () => {
    const { t } = useTransHook()
    const data = useSelector(selectProductGeneralInfo)
    const dispatch = useDispatch()

    const onChangeText = (e: any) => {
        const { name, value } = e.target
        console.log(
            '🚀 ~ file: section-info.tsx ~ line 22 ~ onChangeText ~ e',
            e,
        )
        dispatch(
            updateGeneralInfo({
                field: name,
                value: value,
            }),
        )
    }

    const onChangeNumber = (e: any) => {
        const { name, value } = e.target

        dispatch(
            updateGeneralInfo({
                field: name,
                value: value,
            }),
        )
    }
    return (
        <div className="flex flex-col gap-[30px] lg:gap-6">
            <TextField
                placeholder={t('PRODUCT_NAME')}
                label={t('PRODUCT_NAME')}
                required
                value={data.name}
                name={'name'}
                onChange={onChangeText}
            />

            <TextArera
                label={t('PRODUCT_INFO')}
                required={true}
                placeholder={t('PRODUCT_INFO')}
                name={'description'}
                onChange={onChangeText}
                value={data.description}
            ></TextArera>

            <div className="flex gap-[30px] lg:gap-4">
                <div className="grow">
                    <TextField
                        placeholder={t('PRICE')}
                        label={t('PRICE')}
                        required
                        value={data.price}
                        name={'price'}
                        onChange={onChangeNumber}
                    />
                </div>
                <div className="grow">
                    <TextField
                        placeholder={t('PROMOTION_PRICE')}
                        label={t('PROMOTION_PRICE')}
                        required
                        value={data.promotionPrice}
                        name={'promotionPrice'}
                        onChange={onChangeNumber}
                    />
                </div>
            </div>
            {/* <TextField
                placeholder={t('PRODUCT_CLASSIFY_PLACEHOLDER')}
                label={t('PRODUCT_CLASSIFY')}
                required
            /> */}
        </div>
    )
}

export default SectionInfo
