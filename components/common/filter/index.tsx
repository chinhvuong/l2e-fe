import Select from '@/components/core/select'
import { EStatusOrder } from '@/contants/common'
import React, { useState } from 'react'
import { useTransHook } from '@/locales/hooks'
import Searchbox from '../search-box'
import './style.scss'

type Props = {
    // eslint-disable-next-line no-unused-vars
    onPressSearch: (text: string) => void
}

function Filter({ onPressSearch }: Props) {
    const { t } = useTransHook()

    const [statusValue, setStatusValue] = useState(-1)

    const handleClickItemStatus = (index: number) => {
        setStatusValue(index)
    }

    const renderItemSelect = (data: string, index: number) => {
        if (index === -1) {
            return (
                <div
                    className="hover:bg-slate-400 px-4 py-3 rounded shadow-40-08 border-2"
                    onClick={() => handleClickItemStatus(index)}
                >
                    Tất cả
                </div>
            )
        } else {
            return (
                <div
                    key={index}
                    className={`select-item-transition ${
                        statusValue === index ? 'bg-gray-1 text-white' : ''
                    }`}
                    onClick={() => handleClickItemStatus(index)}
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
                    placeholder="Nhập tên sản phẩm "
                    onPressSearch={onPressSearch}
                />
            </div>
            <div className="select-wraper">
                <div className="select-wraper__item">
                    <Select
                        currentValue={statusValue}
                        title="Trạng thái"
                        data={Object.values(EStatusOrder).map((item) =>
                            t(item),
                        )}
                        renderItem={renderItemSelect}
                    />
                </div>
                <div className="select-wraper__item">
                    <Select
                        currentValue={statusValue}
                        title="Danh mục"
                        data={Object.values(EStatusOrder).map((item) =>
                            t(item),
                        )}
                        renderItem={renderItemSelect}
                    />
                </div>
            </div>
        </div>
    )
}

export default Filter
