import Select from '@/components/core/select'
import React from 'react'
import Searchbox from '../search-box'
import './style.scss'
import { useTransHook } from '@/locales/hooks'

type Props = {
    // eslint-disable-next-line no-unused-vars
    onPressSearch: (text: string) => void
    selectLeft: {
        title: string
        value: number
        data: any[]
        // eslint-disable-next-line no-unused-vars
        setValue: (index: number) => void
    }
    selectRight: {
        title: string
        value: number
        data: any[]
        // eslint-disable-next-line no-unused-vars
        setValue: (index: number) => void
    }
}

function Filter({ onPressSearch, selectLeft, selectRight }: Props) {
    const { t } = useTransHook()
    const renderLeftSelect = (data: string, index: number) => {
        if (index === -1) {
            return (
                <div
                    className="hover:bg-slate-400 px-4 py-3 rounded shadow-40-08 border-2"
                    onClick={() => selectLeft.setValue(index)}
                >
                    Tất cả
                </div>
            )
        } else {
            return (
                <div
                    key={index}
                    className={`select-item-transition ${
                        selectLeft.value === index ? 'bg-gray-1 text-white' : ''
                    }`}
                    onClick={() => selectLeft.setValue(index)}
                >
                    {data}
                </div>
            )
        }
    }

    const renderRightSelect = (data: string, index: number) => {
        if (index === -1) {
            return (
                <div
                    className="hover:bg-slate-400 px-4 py-3 rounded shadow-40-08 border-2"
                    onClick={() => selectRight.setValue(index)}
                >
                    Tất cả
                </div>
            )
        } else {
            return (
                <div
                    key={index}
                    className={`select-item-transition ${
                        selectRight.value === index
                            ? 'bg-gray-1 text-white'
                            : ''
                    }`}
                    onClick={() => selectRight.setValue(index)}
                >
                    {data}
                </div>
            )
        }
    }

    return (
        <div className="filter-container">
            <div className="search-wrapper__item">
                <Searchbox
                    placeholder={t('ENTER_PRODUCT_NAME')}
                    onPressSearch={onPressSearch}
                />
            </div>
            <div className="select-wraper">
                <div className="select-wraper__item">
                    <Select
                        currentValue={selectLeft.value}
                        title={selectLeft.title}
                        data={selectLeft.data}
                        renderItem={renderLeftSelect}
                    />
                </div>
                <div className="select-wraper__item">
                    <Select
                        currentValue={selectRight.value}
                        title={selectRight.title}
                        data={selectRight.data}
                        renderItem={renderRightSelect}
                    />
                </div>
            </div>
        </div>
    )
}

export default Filter
