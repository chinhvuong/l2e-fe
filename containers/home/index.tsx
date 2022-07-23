import React from 'react'
import './style.scss'
import Button from '@/components/core/button'
import Modal, { openModal } from '@/components/core/modal'
// import Slide from '@/components/core/slide'
import Accordion from '@/components/core/accordion'
const modalId = 'modalId'
import DasboardIcon from '@/public/svgs/dashboard.svg'
import TextField from '@/components/core/textfield'
import TextArea from '@/components/core/textarea'
import Searchbox from '@/components/common/search-box'
import UploadImg from '@/components/common/upload-image'

// import Breadcrumb from '@/components/core/breadcrumb'

// const data = [
//     {
//         text: 'Trang chủ',
//         href: '/',
//     },
//     {
//         text: 'Chủ gian hàng',
//         href: '/dashboard',
//         active: true,
//     },
// ]

const HomePageContainer = () => {
    // const renderItem = (data: any) => {
    //     return <div className="h-[100px] bg-red-500">{data?.name}</div>
    // }
    return (
        <div className="">
            {/* <Breadcrumb data={data} /> */}
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
            <div>
                <TextField
                    placeholder="Tên sản phẩm"
                    label="Tên sản phẩm"
                    required
                />

                <TextArea label="Mô tả" required={true} placeholder="Mô tả" />
            </div>
            <div>
                <Searchbox placeholder="Alo" />
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-[413px]">
                <div className="col-span-3">
                    <UploadImg
                        iconClass="w-[94px] h-[94px]"
                        label="Thêm ảnh chính"
                        image={''}
                        onChange={(e) => console.log(e)}
                    />
                </div>
                {Array.from(Array(9).keys()).map((item) => (
                    // <div key={item}>
                    <UploadImg
                        key={item}
                        label={`Ảnh ${1}`}
                        image={''}
                        onChange={(e) => console.log(e)}
                    />
                    // </div>
                ))}
            </div>
        </div>
    )
}

export default HomePageContainer
