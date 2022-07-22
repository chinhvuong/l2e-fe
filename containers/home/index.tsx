import React from 'react'
import './style.scss'
import Button from '@/components/core/button'
import Modal, { openModal } from '@/components/core/modal'
// import Slide from '@/components/core/slide'
import Accordion from '@/components/core/accordion'
const modalId = 'modalId'
import DasboardIcon from '@/public/svgs/dashboard.svg'
import Breadcrumb from '@/components/core/breadcrumb'

console.log('🚀 ~ file: index.tsx ~ line 9 ~ DasboardIcon', DasboardIcon)
// Import Swiper React components

// const data = [
//     {
//         name: 'Hello how are you',
//     },
//     {
//         name: 'Hello how are you',
//     },
//     {
//         name: 'Hello how are you',
//     },
//     {
//         name: 'Hello how are you',
//     },
//     {
//         name: 'Hello how are you',
//     },
//     {
//         name: 'Hello how are you',
//     },
// ]
const data = [
    {
        text: 'Trang chủ',
        href: '/',
    },
    {
        text: 'Chủ gian hàng',
        href: '/dashboard',
        active: true,
    },
]

const HomePageContainer = () => {
    // const renderItem = (data: any) => {
    //     return <div className="h-[100px] bg-red-500">{data?.name}</div>
    // }
    return (
        <div className="">
            <Breadcrumb data={data} />
            HomePageContainer
            <Button onClick={() => openModal(modalId)}>Alo</Button>
            <Button
                className="btn-pri-outline"
                onClick={() => openModal(modalId)}
            >
                Alo
            </Button>
            {/* <div className='border border-red-400'>Alo alo</div> */}
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
            <div className="max-w-[500px]">
                <Accordion title="Allo" icon={<DasboardIcon />}>
                    Alo
                </Accordion>
            </div>
        </div>
    )
}

export default HomePageContainer
