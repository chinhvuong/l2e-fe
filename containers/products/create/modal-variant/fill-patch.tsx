import Button from '@/components/core/button'
import TextField from '@/components/core/textfield'
import { useTransHook } from '@/locales/hooks'
import { fillPatch } from '@/state/product/productCreateSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const FillPatch = () => {
    const { t } = useTransHook()
    const [data, setData] = useState<any>({
        price: '',
        promotionPrice: '',
        quantity: '',
    })

    const dispatch = useDispatch()

    const onChangePrice = (e: any) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
        })
    }

    const onChangeQuantity = (e: any) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
        })
    }

    const apply = () => {
        dispatch(
            fillPatch({
                price: String(data.price),
                promotionPrice: String(data.promotionPrice),
                quantity: String(data.quantity),
            }),
        )
    }

    return (
        <div className="mt-6 mb-[30px] md:mb-5">
            <div className="text-lg leading-[22px] mb-6 font-medium md:text-sm md:leading-[17px]">
                {t('APPLY_FOR_ALL_VARIANTS')}
            </div>
            <div className="flex gap-4 mb-[30px] md:flex-col md:mb-4">
                <div className="grow">
                    <TextField
                        name="price"
                        onChange={onChangePrice}
                        placeholder={t('PRICE')}
                        value={data.price}
                    />
                </div>
                <div className="grow">
                    <TextField
                        name="promotionPrice"
                        onChange={onChangePrice}
                        placeholder={t('PROMOTION_PRICE')}
                        value={data.promotionPrice}
                    />
                </div>
                <div className="grow">
                    <TextField
                        name="quantity"
                        onChange={onChangeQuantity}
                        placeholder={t('QUANTITY')}
                        value={data.quantity}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={apply} className="btn-pri">
                    {t('APPLY')}
                </Button>
            </div>
        </div>
    )
}

export default FillPatch
