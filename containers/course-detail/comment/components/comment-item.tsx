import { useLearningCourseContext } from '@/containers/learn-course/learning-course-context'
import { Comment } from '@/store/comment/types'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import CommentForm from './comment-form'
import useAPI from '@/api/hooks/useAPI'
import { LearnerAPI } from '@/api/api-path'
import { UseMutateFunction } from '@tanstack/react-query'
import Divider from '@/components/core/divider'

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
    const [isEdit, setEdit] = useState(false)
    const [canReply, setReply] = useState(false)
    const { mutate: updateComment, isLoading: isLoadingUpdateComment } =
        useAPI.put(LearnerAPI.COMMENT + '/' + props.data._id, {
            onError: () => {},
            onSuccess: (response) => {
                props.getLearningCommentParent({})
            },
        })
    const { mutate: deleteComment, isLoading: isLoadingDeleteComment } =
        useAPI.delete(LearnerAPI.COMMENT + '/' + props.data._id, {
            onError: () => {},
            onSuccess: (response) => {
                props.getLearningCommentParent({})
            },
        })
    const EditComment = (text: string) => {
        updateComment({ content: text })
        setEdit(false)
    }
    const ReplyComment = (text: string) => {
        props.addComment({
            replyTo: props.data._id,
            lesson: props.leaningId,
            content: text,
        })
        setReply(false)
    }
    const DeleteComment = () => {
        deleteComment({})
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
                    <div className="text-description">{getTimeAgo()}</div>
                </div>
            </div>
            <div className="space-y-3 relative ml-[80px] sm:ml-0">
                {!isEdit ? (
                    <div className="text-justify">{props.data.content}</div>
                ) : (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={props.data.content}
                        handleSubmit={EditComment}
                        handleCancel={() => {
                            setEdit(false)
                        }}
                    />
                )}
                {props.data.level === 1 && (
                    <button
                        className="text-black hover:text-primary"
                        onClick={() => setReply(true)}
                    >
                        <div className="font-semibold text-center text-sm mt-3">
                            Reply
                        </div>
                    </button>
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
                {canReply && (
                    <CommentForm
                        submitLabel="Reply"
                        hasCancelButton
                        handleSubmit={ReplyComment}
                        handleCancel={() => {
                            setReply(false)
                        }}
                    />
                )}
                {isUser && (
                    <button
                        className="text-black hover:text-primary p-2"
                        onClick={() => DeleteComment()}
                    >
                        <div className="font-semibold text-center text-sm mt-3">
                            Delete
                        </div>
                    </button>
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
    )
}
