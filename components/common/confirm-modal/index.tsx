import Button from '@/components/core/button'
import Modal, { closeModal, openModal } from '@/components/core/modal'
import { useTransHook } from '@/locales/hooks'
import React from 'react'

type Props = {
    reject?: () => void
    confirm: () => void
    title: string
    desc: string
    id: string
}

export const openConfirmModal = openModal

function ConfirmModal({ id, reject = () => {}, confirm, title, desc }: Props) {
    const { t } = useTransHook()
    const onConfirm = () => {
        confirm()
        closeModal(id)
    }

    const onReject = () => {
        reject()
        closeModal(id)
    }
    return (
        <Modal id={id} closeIcon>
            <div>
                <div className="text-[20px] leading-6 font-medium mb-3">
                    {title}
                </div>
                <div className="text-sm leading-[17px] font-normal">{desc}</div>
                <div className="flex gap-6 justify-end mt-8">
                    <Button className="btn-pri-outline" onClick={onReject}>
                        {t('CANCEL')}
                    </Button>
                    <Button className="btn-pri" onClick={onConfirm}>
                        {t('AGREE')}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal
