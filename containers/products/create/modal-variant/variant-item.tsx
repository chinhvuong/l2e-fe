import TextField from '@/components/core/textfield'
import { useTransHook } from '@/locales/hooks'
import { updateVariant } from '@/state/product/productCreateSlice'
import { VariantType } from '@/state/product/types'
import { useDispatch } from 'react-redux'

const VariantItem = ({ data, index }: { data: VariantType; index: number }) => {
    const { t } = useTransHook()
    const dispatch = useDispatch()

    const onChangePrice = (e: any) => {
        const { name, value } = e.target

        dispatch(
            updateVariant({
                index: index,
                value: {
                    ...data,
                    [name]: value,
                },
            }),
        )
    }

    const onChangeQuantity = (e: any) => {
        const { name, value } = e.target

        dispatch(
            updateVariant({
                index: index,
                value: {
                    ...data,
                    [name]: value,
                },
            }),
        )
    }
    return (
        <div className="flex items-center gap-4 mb-[30px] last:mb-0 md:flex-col md:items-start md:gap-3">
            <div className="min-w-[150px]  text-[20px] leading-[24px] font-semibold">
                {data.name}
            </div>
            <div className="flex gap-4 grow md:flex-col md:w-full">
                <div className="grow">
                    <TextField
                        onChange={onChangePrice}
                        name={'price'}
                        placeholder="0 đ"
                        value={data.price}
                        label={t('PRICE')}
                    />
                </div>
                <div className="grow">
                    <TextField
                        onChange={onChangePrice}
                        name="promotionPrice"
                        placeholder="0 đ"
                        value={data.promotionPrice}
                        label={t('PROMOTION_PRICE')}
                    />
                </div>
                <div className="grow">
                    <TextField
                        name="quantity"
                        onChange={onChangeQuantity}
                        placeholder="0"
                        value={data.quantity}
                        label={t('QUANTITY')}
                    />
                </div>
            </div>
        </div>
    )
}

export default VariantItem
