import React from 'react'
import './style.scss'
import Button from '@/components/core/button'
import Modal, { openModal } from '@/components/core/modal'

const modalId = 'modalId'

const HomePageContainer = () => {
    return (
        <div className="">
            HomePageContainer
            <Button onClick={() => openModal(modalId)}>Alo</Button>
            <Modal
                id={modalId}
                openDefault={false}
                closeWhenClickOutside={true}
                closeIcon={true}
                className=""
            >
                <div className="">
                    <img src="" alt="" />
                </div>
            </Modal>
        </div>
    )
}

export default HomePageContainer
