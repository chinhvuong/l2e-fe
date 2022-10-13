import { useState, useEffect } from 'react'
import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { useSelector } from 'react-redux'
import { getSidebarInfo } from '@/store/course/selectors'
import VideoPreview from '@/components/core/video-preview'
import IncludeList from './include-list'
import PriceEnrollShare from './price-enroll-share'

export interface ISidebarProps {}

export default function Sidebar() {
    const data = useSelector(getSidebarInfo)
    const [scrollY, setScrollY] = useState(0)
    const [rightMargin, setRightMargin] = useState('0px')

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        handleScroll()

        setRightMargin(`${(window.innerWidth - 1250) / 2}px`)

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div
            className={`under_2xl:hidden bg-white z-20 right-[30px] w-[320px] drop-shadow-xl ${
                scrollY <= 500
                    ? 'absolute h-[860px]'
                    : `fixed top-[20px] h-[690px]`
            }`}
            style={scrollY > 500 ? { right: rightMargin } : {}}
        >
            <VideoPreview
                thumbnail={data.thumbnail}
                className={`${scrollY > 500 ? 'hidden' : ''}`}
                textSize="small"
            />
            <div className="space-y-4 mt-4">
                <div className="mx-7">
                    <PriceEnrollShare price={data.price} />
                    <IncludeList data={data.include} />
                </div>
                <Divider />
                <div className="mx-7">
                    <div className="font-bold text-[20px]">
                        Training 5 or more people?
                    </div>
                    <div className="mt-[10px] mb-[25px]">
                        Get your team access to 17,000+ top Skilline courses
                        anytime, anywhere.
                    </div>
                    <Button className="btn-primary-outline w-full">
                        <div className="font-medium text-[16px]">
                            Try Skilline Business
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}
