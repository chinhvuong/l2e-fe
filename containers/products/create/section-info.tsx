import TextArera from '@/components/core/textarea'
import TextField from '@/components/core/textfield'
import { useTransHook } from '@/locales/hooks'
import React from 'react'

const SectionInfo = () => {
    const { t } = useTransHook()

    return (
        <div className="flex flex-col gap-[30px]">
            <TextField
                placeholder={t('PRODUCT_NAME')}
                label={t('PRODUCT_NAME')}
                required
            />

            <TextArera
                label={t('PRODUCT_INFO')}
                required={true}
                placeholder={t('PRODUCT_INFO')}
            />

            <div className="flex gap-[30px]">
                <div className="grow">
                    <TextField
                        placeholder={t('PRICE')}
                        label={t('PRICE')}
                        required
                    />
                </div>
                <div className="grow">
                    <TextField
                        placeholder={t('PROMOTION_PRICE')}
                        label={t('PROMOTION_PRICE')}
                        required
                    />
                </div>
            </div>
            <TextField
                placeholder={t('PRODUCT_CLASSIFY_PLACEHOLDER')}
                label={t('PRODUCT_CLASSIFY')}
                required
            />
        </div>
    )
}

export default SectionInfo
