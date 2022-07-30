import { useTransHook } from '@/locales/hooks'
import React from 'react'
import { selectProductClassify } from '@/state/product/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { updateClassify } from '@/state/product/productCreateSlice'
import { ClassifyType } from '@/state/product/types'
import TextField from '@/components/core/textfield'
import TextFieldExtra from '@/components/common/textfield-extra'

import XIcon from '@/public/svgs/x.svg'
import ModalVariant from './modal-variant'
const ClassifyItem = ({
    index,
    data,
}: {
    index: number
    data: ClassifyType
}) => {
    const { t } = useTransHook()
    const dispatch = useDispatch()

    const onChangeName = (e: any) => {
        dispatch(
            updateClassify({
                index: index,
                value: {
                    ...data,
                    name: e.target.value,
                },
            }),
        )
    }
    const renderExtra = () => {
        if (!data.options?.length) {
            return <div className="pt-[6px]"></div>
        }
        return (
            <div className="flex gap-2 flex-wrap mb-[10px]">
                {data.options &&
                    !!data.options.length &&
                    data.options.map((item, index) => (
                        <div
                            className="flex p-1 gap-1 min-w-fit justify-between items-center bg-gray-d9 rounded-[4px]"
                            key={index}
                        >
                            <span className="text-xs leading-[15px] text-black">
                                {item}
                            </span>
                            <XIcon
                                className="cursor-pointer hover:text-pri"
                                onClick={() => onRemoveOption(index)}
                            />
                        </div>
                    ))}
            </div>
        )
    }

    const onAddOption = (e: any) => {
        if (e.keyCode === 13) {
            if (e.target?.value.trim()) {
                dispatch(
                    updateClassify({
                        index: index,
                        value: {
                            ...data,
                            options: [...data.options, e.target?.value.trim()],
                        },
                    }),
                )
                e.target.value = ''
            }
        }
    }

    const onRemoveOption = (id: number) => {
        const newOptions = [
            ...data.options.slice(0, id),
            ...data.options.slice(id + 1),
        ]

        console.log(newOptions)
        console.log({
            index: index,
            value: {
                ...data,
                options: newOptions,
            },
        })
        dispatch(
            updateClassify({
                index: index,
                value: {
                    ...data,
                    options: newOptions,
                },
            }),
        )
    }

    return (
        <div className="mb-4 last:mb-0">
            <div className="text-sm leading-[17px] mb-[13px]">
                {t('ATTRIBUTE')} {index + 1}
            </div>

            <div className="flex gap-4">
                <div className="w-1/3 flex-shrink-0">
                    <TextField
                        onChange={onChangeName}
                        placeholder={t('ATTRIBUTE_NAME')}
                        className="text-black-50"
                        value={data.name}
                    />
                </div>
                <div className="grow">
                    <TextFieldExtra
                        extra={renderExtra()}
                        placeholder={t('ADD_LABEL')}
                        className="text-black-50"
                        onChange={console.log}
                        onKeyUp={onAddOption}
                    />
                </div>
            </div>
        </div>
    )
}
const SectionInfo = () => {
    const { t } = useTransHook()
    const classify = useSelector(selectProductClassify)
    console.log(
        '🚀 ~ file: section-classify.tsx ~ line 34 ~ SectionInfo ~ classify',
        classify,
    )

    return (
        <div className="mt-6">
            <div className="leading-[19px] mb-4">
                {t('VARIANT')} <span className="text-error">*</span>
            </div>
            <div className="rounded-lg shadow-30 p-6">
                {classify &&
                    classify.length &&
                    classify.map((item, index) => (
                        <ClassifyItem data={item} index={index} key={index} />
                    ))}
            </div>

            <ModalVariant />
        </div>
    )
}

export default SectionInfo
