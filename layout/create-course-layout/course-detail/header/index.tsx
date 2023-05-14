import Button from '@/components/core/button'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import { useAppSelector } from '@/hooks'
import { getUpdateFileState } from '@/store/course/curriculum/selectors'
import {
    getUploadingPromotionalVideoState,
    getUploadingThumbnailState,
} from '@/store/course/selectors'
import { getGlobalLoadingState } from '@/store/user/selectors'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'

export interface IHeaderProps {}

export default function Header() {
    const { handleUpdateCourseDetail } = useCreateCourseContext()

    const isUploadingFile = useAppSelector(getUpdateFileState)
    const isUploadingThumbnail = useAppSelector(getUploadingThumbnailState)
    const isUploadingPromotionalVideo = useAppSelector(
        getUploadingPromotionalVideoState,
    )
    const isLoading = useAppSelector(getGlobalLoadingState)
    const goBack = () => {
        Router.push('/instructor/courses')
    }

    return (
        <div className="flex items-center justify-between bg-black h-[65px] w-full fixed top-0 z-40 px-5">
            <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => goBack()}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="text-xl bg-black text-white"
                />
                <div className="text-white">Back</div>
            </div>
            <Button
                isLoading={
                    isLoading ||
                    isUploadingFile ||
                    isUploadingThumbnail ||
                    isUploadingPromotionalVideo
                }
                onClick={() => handleUpdateCourseDetail()}
                disabled={
                    isLoading ||
                    isUploadingFile ||
                    isUploadingThumbnail ||
                    isUploadingPromotionalVideo
                }
            >
                <div className="font-semibold">Save</div>
            </Button>
        </div>
    )
}
