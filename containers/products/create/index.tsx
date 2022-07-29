import { useTransHook } from '@/locales/hooks'
import React from 'react'
import SectionMedia from './section-media'
import SectionInfo from './section-info'
import SectionFund from './section-fund'
import CreateActions from './create-actions'
import SelectCategory from './select-category'
import SectionClassify from './section-classify'

const Create = () => {
    const { t } = useTransHook()

    return (
        <div>
            <h1 className="heading-1 mb-[45px] md:mb-6 md-heading-collapse">
                {t('ADD_NEW_PRODUCT')}
            </h1>
            <div className="flex gap-[30px] lg:gap-6 md:flex-col">
                <div className="w-[30%] md:w-full">
                    <SectionMedia />
                </div>
                <div className="grow">
                    <SectionInfo />
                    <SelectCategory />
                    <SectionClassify />
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
