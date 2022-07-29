import React from 'react'
import Modal, { toggleModal } from '@/components/core/modal'
import Button from '@/components/core/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductVariants } from '@/state/product/selectors'
import { useTransHook } from '@/locales/hooks'
import { calculateVariants } from '@/state/product/productCreateSlice'

import VariantItem from './variant-item'
import FillPatch from './fill-patch'

const variantModal = 'variant-modal'

const ModalVariant = () => {
    const variants = useSelector(selectProductVariants)
    const { t } = useTransHook()
    const dispatch = useDispatch()

    const openModal = () => {
        dispatch(calculateVariants())
        toggleModal(variantModal)
    }
    return (
        <>
            <Modal
                id={variantModal}
                closeWhenClickOutside
                className="w-2/3 px-20 md:px-0"
                closeIcon
            >
                <div className="p-4 md:pt-0">
                    <h2 className="heading-1 mb-9 md:mb-4 md:!text-xl !md:font-semibold">
                        {t('SETTING_VARIANTS')}
                    </h2>

                    <hr />

                    <FillPatch />

                    <hr />
                    <div className="mt-[30px]">
                        {variants.map((item, index) => (
                            <VariantItem
                                index={index}
                                key={index}
                                data={item}
                            />
                        ))}
                    </div>
                    <div className="flex justify-end mt-[30px]">
                        <Button>{t('SAVE')}</Button>
                    </div>
                </div>
            </Modal>
            <Button onClick={openModal} className="btn-pri !rounded-lg mt-5">
                {t('CREATE_VARIANT')}
            </Button>

            {variants.length > 0 && (
                <div className="mt-6">
                    <Button
                        onClick={openModal}
                        className="btn-pri-outline !rounded-lg"
                    >
                        {t('EDIT_VARIANT')}
                    </Button>
                </div>
            )}
        </>
    )
}

export default ModalVariant
