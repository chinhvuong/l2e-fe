import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import DeleteConfirmModal from '@/components/core/modal/delete-confirm-modal'
import UpdateReviewsModal from '@/components/core/modal/update-success-modal'
import RatingStar from '@/components/core/rating-star'
import RatingBar from '@/components/core/rating-star/rating-bar'
import { useAppDispatch } from '@/hooks'
import { Rating } from '@/store/rating/types'
import { updateGlobalLoadingState } from '@/store/user'
import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import CommentForm from '../../comment/components/comment-form'
import Router from 'next/router'

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
    const dispatch = useAppDispatch()
    const { mutate: updateRating, isLoading: isLoadingUpdateComment } =
        useAPI.put(LearnerAPI.RATING + '/' + props.data._id, {
            onError: noop,
            onSuccess: () => {
                setUserAction('Update')
                isShow(true)
            },
        })
    const { mutate: deleteRating, isLoading: isLoadingDeleteComment } =
        useAPI.delete(LearnerAPI.RATING + '/' + props.data._id, {
            onError: noop,
            onSuccess: () => {
                setUserAction('Delete')
                isShow(true)
            },
        })
    const isUser =
        String(address).toLowerCase() ===
        props.data.user.walletAddress.toLowerCase()
    const [isEdit, setIsEdit] = useState(false)
    const [ratingCount, setRatingCount] = useState(props.data.rating)
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
        const minuteAgo = Math.round(
            (new Date().getTime() - new Date(props.data.updatedAt).getTime()) /
                60000,
        )

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
        } else if (hourAgo === 1 && minuteAgo >= 60) {
            return `1 hour ago`
        } else if (1 < minuteAgo && minuteAgo < 60) {
            return `${minuteAgo} minutes ago`
        } else if (minuteAgo === 1) {
            return `1 minute ago`
        } else {
            return 'recently'
        }
    }
    const handleDeleteRating = () => {
        setShowDeleteRatingConfirmModal(false)
        deleteRating({})
        setIsEdit(false)
    }
    const editRating = (text: string) => {
        updateRating({ rating: ratingCount, content: text })
        setIsEdit(false)
    }
    const goToUserDetailPage = (id: string) => {
        if (id) {
            Router.push('/user/' + id)
        }
    }

    useEffect(() => {
        dispatch(
            updateGlobalLoadingState(
                isLoadingUpdateComment || isLoadingDeleteComment,
            ),
        )
    }, [isLoadingUpdateComment, isLoadingDeleteComment])

    return (
        <div>
            <DeleteConfirmModal
                isShow={showDeleteRatingConfirmModal}
                setIsShow={setShowDeleteRatingConfirmModal}
                deleteAction={handleDeleteRating}
            />
            <UpdateReviewsModal
                isShow={show}
                setIsShow={isShow}
                userRequest={userAction}
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
                    <div
                        className="font-bold mt-1 cursor-pointer"
                        onClick={() => goToUserDetailPage(props.data.user?._id)}
                    >
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
            <div className="space-y-3 relative ml-[80px] sm:ml-0">
                {!isEdit ? (
                    <div className="text-justify">{props.data.content}</div>
                ) : (
                    <div>
                        <RatingBar
                            selectedRatingPoint={ratingCount}
                            setRating={setRatingCount}
                        />
                        <CommentForm
                            initialText={props.data.content}
                            handleSubmit={editRating}
                        />
                    </div>
                )}
                {isUser && props.isLearn && (
                    <button
                        className={`hover:text-primary-hover-hover pr-6 ${
                            isEdit ? 'text-primary' : 'text-black'
                        }`}
                        onClick={() => setIsEdit(!isEdit)}
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
            </div>
        </div>
    )
}
