import Select from '@/components/core/select'

import { useTransHook } from '@/locales/hooks'
import React from 'react'
import { selectProductCategory } from '@/state/product/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { updateCategory } from '@/state/product/productCreateSlice'
const SectionInfo = () => {
    const { t } = useTransHook()
    const dispatch = useDispatch()
    const category = useSelector(selectProductCategory)
    const options = [
        {
            name: 'Alo category 1',
            id: 1,
        },
        {
            name: 'Alo category 2',
            id: 2,
        },
    ]

    const onSelectCategory = (id: any) => {
        dispatch(updateCategory(id?.toString()))
    }

    const renderItem = (item: any, key: number) => {
        if (key === -1) {
            return (
                <div
                    className="py-2 transition-colors hover:bg-pri-17 !text-black-50"
                    key={key}
                    onClick={() => onSelectCategory(0)}
                >
                    {item}
                </div>
            )
        }
        return (
            <div
                className="py-2 transition-colors hover:bg-pri-17 !text-black-50"
                key={key}
                onClick={() => onSelectCategory(item.id)}
            >
                {item.name}
            </div>
        )
    }
    const getText = () => {
        for (let i = 0; i < options.length; i++) {
            if (options[i].id.toString() === category) {
                return <div className="!text-black-50">{options[i].name}</div>
            }
        }
        return ''
    }

    return (
        <div className="mt-6">
            <div className="leading-[19px] mb-4">
                {t('CATEGORY')} <span className="text-error">*</span>
            </div>
            <Select
                className="text-black-50"
                placeholder={t('SELECT_CATEGORY_PLACEHOLDER')}
                renderItem={renderItem}
                textShow={getText()}
                data={options}
            />
        </div>
    )
}

export default SectionInfo
