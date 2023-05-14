import VideoPreview from '@/components/core/video-preview'
import { useAppSelector } from '@/hooks'
import { getLoginState } from '@/store/user/selectors'
import { useCourseDetailContext } from '../course-detail-context'
import IncludeList from './include-list'
import PriceEnrollShare from './price-enroll-share'

export interface ISidebarProps {}

export default function Sidebar() {
    const { data, isShowVideoModal, setIsShowVideoModal } =
        useCourseDetailContext()
    const loginState = useAppSelector(getLoginState)
    const includeList = {
        duration: '65 hours on-demand video',
        resource: '49 downloadable resources',
        assignments: 'Assignments',
        certificate: 'Certificate of completion',
        lifetimeAccess: 'Full lifetime access',
        device: 'Access on mobile and TV',
        articles: '85 articles',
        exercise: '8 coding exercises',
    }

    return (
        <div className="w-[320px]">
            {data ? (
                <>
                    <div>
                        {data.promotionalVideo && (
                            <VideoPreview
                                video={data.promotionalVideo}
                                onClick={() =>
                                    setIsShowVideoModal(!isShowVideoModal)
                                }
                                className="w-[320px]"
                            />
                        )}
                        <div className="space-y-4 mt-4 pb-6">
                            <div className="mx-7 space-y-3">
                                <div className="font-semibold text-[36px]">
                                    {data.price + ' USDT'}
                                </div>
                                {loginState && <PriceEnrollShare data={data} />}
                                <IncludeList data={includeList} />
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
