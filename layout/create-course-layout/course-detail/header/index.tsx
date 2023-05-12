import Button from '@/components/core/button'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import { useAppSelector } from '@/hooks'
import { getUpdateFileState } from '@/store/course/curriculum/selectors'
import {
    getUploadingPromotionalVideoState,
    getUploadingThumbnailState,
} from '@/store/course/selectors'
import { getGlobalLoadingState, getUserProfile } from '@/store/user/selectors'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'

export interface IHeaderProps {}

export default function Header() {
    const {
        courseDetail,
        courseSections,
        updateCourse,
        upsertSections,
        chosenFinalTest,
        updateProfile,
    } = useCreateCourseContext()

    const isUploadingFile = useAppSelector(getUpdateFileState)
    const isUploadingThumbnail = useAppSelector(getUploadingThumbnailState)
    const isUploadingPromotionalVideo = useAppSelector(
        getUploadingPromotionalVideoState,
    )
    const isLoading = useAppSelector(getGlobalLoadingState)
    const userProfile = useAppSelector(getUserProfile)
    const goBack = () => {
        Router.push('/instructor/courses')
    }

    const handleUpdateCourseDetail = () => {
        updateCourse({
            include: courseDetail.include,
            finalTest: chosenFinalTest.value,
            _id: courseDetail._id,
            owner: courseDetail.owner,
            author: courseDetail.author,
            name: courseDetail.name,
            overview: courseDetail.overview,
            description: courseDetail.description,
            price: courseDetail.price,
            rating: courseDetail.rating,
            reviews: courseDetail.reviews,
            language: courseDetail.language,
            approved: courseDetail.approved,
            requirements: courseDetail.requirements,
            goals: courseDetail.goals,
            thumbnail: courseDetail.thumbnail,
            promotionalVideo: courseDetail.promotionalVideo,
            category: courseDetail.category,
            createdAt: courseDetail.createdAt,
            updatedAt: courseDetail.updatedAt,
            __v: courseDetail.__v,
            students: courseDetail.students,
            courseId: courseDetail.courseId,
            sections: courseDetail.sections,
            lastApproveRequestAt: courseDetail.lastApproveRequestAt,
        })
        upsertSections(
            courseSections.map((item) => {
                const el: any = { ...item }
                delete el._id
                return el
            }),
        )
        updateProfile({
            name: userProfile.name,
            avatar: userProfile.avatar,
            title: userProfile.title,
            bio: userProfile.bio,
        })
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
