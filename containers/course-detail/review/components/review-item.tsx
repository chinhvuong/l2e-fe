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
import DeleteConfirmModal from '@/components/core/modal/delete-confirm-modal'

export interface IReviewItemProps {
    data: Rating
    isLearn: boolean
}

export default function ReviewItem(props: IReviewItemProps) {
    const { address } = useAccount()
    const [show, isShow] = useState(false)
    const [userAction, setUserAction] = useState('')
    const [showDeleteRatingConfirmModal, setShowDeleteRatingConfirmModal] =
        useState(false)
    const { mutate: updateRating, isLoading: isLoadingUpdateComment } =
        useAPI.put(LearnerAPI.RATING + '/' + props.data._id, {
            onError: () => {},
            onSuccess: (response) => {
                //  props.getRatingCourseDetail({})
                setUserAction('Update')
                isShow(true)
            },
        })
    const { mutate: deleteRating, isLoading: isLoadingDeleteComment } =
        useAPI.delete(LearnerAPI.RATING + '/' + props.data._id, {
            onError: () => {},
            onSuccess: (response) => {
                setUserAction('Delete')
                isShow(true)
                //   setCanRating(true)
                //  props.getRatingCourseDetail({})
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
    const handleDeleteRating = () => {
        setShowDeleteRatingConfirmModal(false)
        deleteRating({})
    }
    const EditRating = (text: string) => {
        updateRating({ rating: ratingCount, content: text })
        setEdit(false)
    }
    return (
        <div>
            <DeleteConfirmModal
                isShow={showDeleteRatingConfirmModal}
                setIsShow={setShowDeleteRatingConfirmModal}
                deleteAction={handleDeleteRating}
            />
            <div className="flex items-center my-4 space-x-5 sm:space-x-0">
                {props.data.user.avatar !== null ? (
                    <img
                        src={`${props.data.user.avatar}`}
                        alt=""
                        className="rounded-[50%] w-[60px]"
                    />
                ) : (
                    <img
                        src="/svgs/default_user_avatar.svg"
                        alt=""
                        className="rounded-[50%] w-[60px]"
                    />
                )}
                <div className="space-y-2">
                    <div className="font-bold mt-1">
                        {props.data.user?.name ?? 'Anonymous'}
                    </div>
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
                            // submitLabel="Update"
                            // hasCancelButton
                            initialText={props.data.content}
                            handleSubmit={EditRating}
                            // handleCancel={() => {
                            // setEdit(false)
                            // }}
                        />
                    </div>
                )}
                {isUser && props.isLearn && (
                    <button
                        className={`hover:text-primary-hover-hover pr-6 ${
                            isEdit ? 'text-primary' : 'text-black'
                        }`}
                        onClick={() => setEdit(true)}
                    >
                        <div className="font-semibold text-center text-sm mt-3">
                            Edit
                        </div>
                    </button>
                )}
                {isUser && props.isLearn && (
                    <button
                        className="text-black hover:text-primary p-2"
                        onClick={() => setShowDeleteRatingConfirmModal(true)}
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
            <UpdateReviewsModal
                isShow={show}
                setIsShow={isShow}
                userRequest={userAction}
            />
        </div>
    )
}
