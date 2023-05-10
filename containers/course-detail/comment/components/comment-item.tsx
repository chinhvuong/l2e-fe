import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import Divider from '@/components/core/divider'
import DeleteConfirmModal from '@/components/core/modal/delete-confirm-modal'
import { Comment } from '@/store/comment/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import CommentForm from './comment-form'
import { noop } from 'lodash'
import { useAppDispatch } from '@/hooks'
import { updateGlobalLoadingState } from '@/store/user'

export interface ICommentItemProps {
    data: Comment
    replies: Comment[]
    leaningId: string
    getLearningCommentParent: UseMutateFunction<unknown, any, object, unknown>
    addComment: UseMutateFunction<unknown, any, object, unknown>
}

export default function CommentItem(props: ICommentItemProps) {
    const { address } = useAccount()
    const isUser =
        String(address).toLowerCase() ===
        props.data.user.walletAddress.toLowerCase()
    const [isEdit, setIsEdit] = useState(false)
    const [canReply, setCanReply] = useState(false)
    const [showDeleteCommentConfirmModal, setShowDeleteCommentConfirmModal] =
        useState(false)
    const dispatch = useAppDispatch()

    const { mutate: updateComment, isLoading: isLoadingUpdateComment } =
        useAPI.put(LearnerAPI.COMMENT + '/' + props.data._id, {
            onError: noop,
            onSuccess: () => {
                props.getLearningCommentParent({})
            },
        })
    const { mutate: deleteComment, isLoading: isLoadingDeleteComment } =
        useAPI.delete(LearnerAPI.COMMENT + '/' + props.data._id, {
            onError: noop,
            onSuccess: (response) => {
                props.getLearningCommentParent({})
            },
        })
    const EditComment = (text: string) => {
        updateComment({ content: text })
        setIsEdit(false)
    }
    const ReplyComment = (text: string) => {
        props.addComment({
            replyTo: props.data._id,
            lesson: props.leaningId,
            content: text,
        })
        setCanReply(false)
    }

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

    const handleDeleteComment = () => {
        setShowDeleteCommentConfirmModal(false)
        deleteComment({})
    }

    useEffect(() => {
        dispatch(
            updateGlobalLoadingState(
                isLoadingUpdateComment || isLoadingDeleteComment,
            ),
        )
    }, [isLoadingUpdateComment, isLoadingDeleteComment])

    return (
        <>
            <DeleteConfirmModal
                isShow={showDeleteCommentConfirmModal}
                setIsShow={setShowDeleteCommentConfirmModal}
                deleteAction={handleDeleteComment}
            />
            <div className="mt-6">
                <div className="flex items-center space-x-5 sm:space-x-0">
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
                    <div className="space-y-1">
                        <div className="font-bold text-lg mt-1">
                            {props.data.user?.name ?? 'Anonymous'}
                        </div>
                        <div className="text-description text-xs">
                            {getTimeAgo()}
                        </div>
                    </div>
                </div>
                <div className="my-4 sm:ml-0">
                    <div className="ml-20">
                        {!isEdit && !isLoadingUpdateComment ? (
                            <div className="text-justify">
                                {props.data.content}
                            </div>
                        ) : (
                            <CommentForm
                                initialText={props.data.content}
                                handleSubmit={EditComment}
                            />
                        )}
                        {props.data.level === 1 && (
                            <button
                                className={`hover:text-primary-hover-hover pr-6 ${
                                    canReply ? 'text-primary' : 'text-black'
                                }`}
                                onClick={() => setCanReply(!canReply)}
                            >
                                <div className="font-semibold text-center text-sm mt-3">
                                    Reply
                                </div>
                            </button>
                        )}
                        {isUser && (
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
                        {isUser && (
                            <button
                                className="text-black hover:text-primary-hover"
                                onClick={() =>
                                    setShowDeleteCommentConfirmModal(true)
                                }
                            >
                                <div className="font-semibold text-center text-sm mt-3">
                                    Delete
                                </div>
                            </button>
                        )}
                    </div>
                    {canReply && (
                        <div className="flex items-center space-x-5 sm:space-x-0 mt-5 ml-10">
                            <img
                                src="/svgs/default_user_avatar.svg"
                                alt=""
                                className="rounded-[50%] w-[60px] sm:hidden"
                            />
                            <CommentForm handleSubmit={ReplyComment} />
                        </div>
                    )}
                </div>
                {props.replies.map((reply, index) => (
                    <div key={index} className="space-y-6 pl-10">
                        <CommentItem
                            data={reply}
                            replies={[]}
                            getLearningCommentParent={
                                props.getLearningCommentParent
                            }
                            leaningId={props.leaningId}
                            addComment={props.addComment}
                        />
                        {index !== props.replies.length - 1 && <Divider />}
                    </div>
                ))}
            </div>
        </>
    )
}
