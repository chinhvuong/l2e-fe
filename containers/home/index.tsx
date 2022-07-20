import React from 'react'
import './style.scss'
import Button from '@/components/core/button'
import Modal, { openModal } from '@/components/core/modal'
import Slide from '@/components/core/slide'

const modalId = 'modalId'
// Import Swiper React components

const data = [
    {
        name: 'Hello how are you',
    },
    {
        name: 'Hello how are you',
    },
    {
        name: 'Hello how are you',
    },
    {
        name: 'Hello how are you',
    },
    {
        name: 'Hello how are you',
    },
    {
        name: 'Hello how are you',
    },
]
const HomePageContainer = () => {
    const renderItem = (data: any) => {
        return <div className="h-[100px] bg-red-500">{data?.name}</div>
    }
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
                <div className="h-[500px] bg-red-500">
                    <img src="" alt="" />
                </div>
            </Modal>
            <div className="p-4">
                <Slide
                    data={data}
                    renderItem={renderItem}
                    // slidesPerView={3}
                    breakpoints={{
                        // when window width is >= 640px
                        640: {
                            //   width: 640,
                            slidesPerView: 2,
                        },
                        // when window width is >= 768px
                        768: {
                            //   width: 768,
                            slidesPerView: 2,
                        },

                        1280: {
                            //   width: 768,
                            slidesPerView: 3,
                        },
                        1480: {
                            //   width: 768,
                            slidesPerView: 4,
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default HomePageContainer
