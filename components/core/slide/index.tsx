// Import Swiper React components
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { Pagination } from 'swiper'
// Import Swiper styles
// import 'swiper/css';
// import "swiper/css/pagination";
// import 'swiper/swiper-bundle.css';
import 'swiper/css/bundle'
import './style.scss'

import { ReactElement } from 'react'

type SlideProps = {
    data: any[]
    // eslint-disable-next-line no-unused-vars
    renderItem: (data: any) => ReactElement
}
const Slide = ({ data, renderItem, ...rest }: SlideProps & SwiperProps) => {
    return (
        <Swiper
            className="custom-slide"
            spaceBetween={28}
            // slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={true}
            modules={[Pagination]}
            breakpoints={{
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 4,
                    spaceBetween: 32,
                },
            }}
            {...rest}
        >
            {data &&
                data.length &&
                data.map((item, index) => (
                    <SwiperSlide key={index}>{renderItem(item)}</SwiperSlide>
                ))}
            {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ... */}
        </Swiper>
    )
}

export default Slide
