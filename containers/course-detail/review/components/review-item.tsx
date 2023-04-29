import RatingStar from '@/components/core/rating-star'
import * as React from 'react'
import ShowMore from '@/components/core/show-more'
import { Rating } from '@/store/rating/types'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import { useLearningCourseContext } from '@/containers/learn-course/learning-course-context'
import useAPI from '@/api/hooks/useAPI'
import { LearnerAPI } from '@/api/api-path'
import CommentForm from '../../comment/components/comment-form'
import RatingBar from '@/components/core/rating-star/rating-bar'
import { UseMutateFunction } from '@tanstack/react-query'
import UpdateReviewsModal from '@/components/core/modal/update-success-moda'

export interface IReviewItemProps {
    data: Rating
    getRatingCourseDetail: UseMutateFunction<unknown, any, object, unknown>
}

export default function ReviewItem(props: IReviewItemProps) {
    const { setCanRating } = useLearningCourseContext()
    const { address } = useAccount()
    const [show, isShow] = useState(false)
    const { mutate: updateRating, isLoading: isLoadingUpdateComment } =
        useAPI.put(LearnerAPI.RATING + '/' + props.data._id, {
            onError: () => {},
            onSuccess: (response) => {
                props.getRatingCourseDetail({})
                isShow(true)
            },
        })
    const { mutate: deleteRating, isLoading: isLoadingDeleteComment } =
        useAPI.delete(LearnerAPI.RATING + '/' + props.data._id, {
            onError: () => {},
            onSuccess: (response) => {
                setCanRating(true)
                props.getRatingCourseDetail({})
            },
        })
    const isUser =
        String(address).toLowerCase() ===
        props.data.user.walletAddress.toLowerCase()
    const [isEdit, setEdit] = useState(false)
    const [ratingCount, setRatingCount] = useState(0)
    const getTimeAgo = () => {
        const yearAgo =
            new Date().getFullYear() -
            new Date(props.data.updatedAt).getFullYear()
        const monthAgo =
            new Date().getMonth() - new Date(props.data.updatedAt).getMonth()
        const dayAgo =
            new Date().getDate() - new Date(props.data.updatedAt).getDate()
        const hourAgo =
            new Date().getHours() - new Date(props.data.updatedAt).getHours()

        if (yearAgo > 1) {
            return `${yearAgo} years ago`
        } else if (yearAgo === 1) {
            return `1 year ago`
        } else if (monthAgo > 1) {
            return `${monthAgo} months ago`
        } else if (monthAgo === 1) {
            return `1 month ago`
        } else if (dayAgo > 1) {
            return `${dayAgo} day ago`
        } else if (dayAgo === 1) {
            return 'yesterday'
        } else if (hourAgo > 1) {
            return `${hourAgo} hours ago`
        } else if (hourAgo === 1) {
            return `1 hour ago`
        } else {
            return 'recently'
        }
    }
    const DeleteRating = () => {
        deleteRating({})
    }
    const EditRating = (text: string) => {
        updateRating({ rating: ratingCount, content: text })
        setEdit(false)
    }
    return (
        <div>
            <div className="flex items-center my-4 space-x-5 sm:space-x-0">
                <img
                    src="/images/avatar.jpg"
                    alt=""
                    className="rounded-[50%] w-[60px] sm:hidden"
                />
                <div className="space-y-2">
                    <div className="font-bold mt-1">{props.data.user.name}</div>
                    <div className="flex items-center space-x-5">
                        <RatingStar
                            id={props.data._id}
                            ratingScore={props.data.rating}
                            hideScore
                        />
                        <div className="text-description">{getTimeAgo()}</div>
                    </div>
                </div>
            </div>
            <div
                id={`review-${props.data._id}`}
                className="space-y-3 relative ml-[80px] sm:ml-0"
            >
                {!isEdit ? (
                    <div className="text-justify">{props.data.content}</div>
                ) : (
                    <div>
                        <div>Your Rating: </div>
                        <RatingBar
                            selectedRatingPoint={ratingCount}
                            setRating={setRatingCount}
                        />
                        <CommentForm
                            submitLabel="Update"
                            hasCancelButton
                            initialText={props.data.content}
                            handleSubmit={EditRating}
                            handleCancel={() => {
                                setEdit(false)
                            }}
                        />
                    </div>
                )}
                {isUser && (
                    <button
                        className="text-black hover:text-primary p-2"
                        onClick={() => setEdit(true)}
                    >
                        <div className="font-semibold text-center text-sm mt-3">
                            Edit
                        </div>
                    </button>
                )}
                {isUser && (
                    <button
                        className="text-black hover:text-primary p-2"
                        onClick={() => DeleteRating()}
                    >
                        <div className="font-semibold text-center text-sm mt-3">
                            Delete
                        </div>
                    </button>
                )}
                <ShowMore
                    el={`review-${props.data._id}`}
                    elHeightPreview={200}
                />
            </div>
            <UpdateReviewsModal isShow={show} setIsShow={isShow} />
        </div>
    )
}
