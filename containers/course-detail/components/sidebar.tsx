import VideoModal from '@/components/core/modal/video-modal'
import VideoPreview from '@/components/core/video-preview'
import { dataCourses_detail } from '@/data/course-detail'
import { useState } from 'react'
import { useCourseDetailContext } from '../course-detail-context'
import IncludeList from './include-list'
import PriceEnrollShare from './price-enroll-share'

export interface ISidebarProps {}

export default function Sidebar() {
    const { data } = useCourseDetailContext()
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="w-[320px]">
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
                    <div>
                        {data.promotionalVideo && (
                            <VideoPreview
                                video={data.promotionalVideo}
                                onClick={() => setShowModal(!showModal)}
                            />
                        )}
                        <div className="space-y-4 mt-4 pb-6">
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
                <div>
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
        </div>
    )
}
