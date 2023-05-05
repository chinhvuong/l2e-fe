import VideoModal from '@/components/core/modal/video-modal'
import VideoPreview from '@/components/core/video-preview'
import { dataCourses_detail } from '@/data/course-detail'
import { useEffect, useState } from 'react'
import { useCourseDetailContext } from '../course-detail-context'
import IncludeList from './include-list'
import PriceEnrollShare from './price-enroll-share'

export interface ISidebarProps {}

export default function Sidebar() {
    const { data } = useCourseDetailContext()
    const [scrollY, setScrollY] = useState(0)
    const [rightMargin, setRightMargin] = useState('0px')
    const [showModal, setShowModal] = useState(false)

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
        <>
            {data ? (
                <>
                    {data.promotionalVideo && (
                        <VideoModal
                            isShow={showModal}
                            setIsShow={setShowModal}
                            url={data.promotionalVideo}
                            showPreview={false}
                            courseName={data.name}
                        />
                    )}
                    <div
                        className={`under_2xl:hidden bg-white z-20 right-[30px] w-[320px] drop-shadow-xl ${
                            scrollY <= 500 ? 'absolute' : `fixed top-[20px]`
                        }`}
                        style={scrollY > 500 ? { right: rightMargin } : {}}
                    >
                        {data.promotionalVideo && (
                            <VideoPreview
                                video={data.promotionalVideo}
                                onClick={() => setShowModal(!showModal)}
                            />
                        )}
                        <div className="space-y-4 mt-4 mb-6">
                            <div className="mx-7 space-y-3">
                                <PriceEnrollShare data={data} />
                                {dataCourses_detail.include && (
                                    <IncludeList
                                        data={dataCourses_detail.include}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div
                    className={`under_2xl:hidden bg-white z-20 right-[30px] w-[320px] drop-shadow-xl ${
                        scrollY <= 500 ? 'absolute' : `fixed top-[20px]`
                    }`}
                    style={scrollY > 500 ? { right: rightMargin } : {}}
                >
                    <div className="animate-pulse flex w-full mb-6">
                        <div className="flex-1 space-y-6">
                            <div className="h-2 bg-slate-700 w-full h-[200px]"></div>
                            <div className="mx-7 space-y-6">
                                <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                                <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
