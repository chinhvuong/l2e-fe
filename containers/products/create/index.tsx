import { useTransHook } from '@/locales/hooks'
import React from 'react'
import SectionMedia from './section-media'
import SectionInfo from './section-info'
import SectionFund from './section-fund'
import CreateActions from './create-actions'

const Create = () => {
    const { t } = useTransHook()

    return (
        <div>
            <h1 className="heading-1 mb-[45px]">{t('ADD_NEW_PRODUCT')}</h1>
            <div className="flex gap-[30px]">
                <div className="w-[30%] max-w-[600px]">
                    <SectionMedia />
                </div>
                <div className="grow">
                    <SectionInfo />
                    <SectionFund className="mt-[91px]" />
                </div>
            </div>
            <div className="mb-[100px] mt-10">
                <CreateActions />
            </div>
        </div>
    )
}

export default Create
