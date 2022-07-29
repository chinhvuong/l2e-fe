import Button from '@/components/core/button'
import { useTransHook } from '@/locales/hooks'
import React from 'react'
import ConfirmModal, {
    openConfirmModal,
} from '@/components/common/confirm-modal'
import { useDispatch } from 'react-redux'
import { resetCreateProduct } from '@/state/product/productCreateSlice'
const CreateActions = () => {
    const { t } = useTransHook()
    const dispatch = useDispatch()

    const onCancel = () => {
        dispatch(resetCreateProduct())
    }

    return (
        <div className="flex justify-end gap-[30px]">
            <Button
                className="btn-pri-outline !rounded-[10px] !px-6 py-4 !text-base"
                onClick={() =>
                    openConfirmModal('comfirm-cancel-create-product')
                }
            >
                {t('CANCEL')}
            </Button>
            <ConfirmModal
                id={'comfirm-cancel-create-product'}
                reject={() => {}}
                confirm={onCancel}
                title={t('CANCEL_CREATE_PRODUCT_CONFIRM')}
                desc={t('CANCEL_CREATE_PRODUCT_CONFIRM_DESC')}
            />
            <Button className="!rounded-[10px] !px-7 py-4 !text-base">
                {t('SAVE_AND_SHOW')}
            </Button>
        </div>
    )
}

export default CreateActions
