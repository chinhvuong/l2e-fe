import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { useAppSelector } from '@/hooks'
import { getComments } from '@/store/comment/selectors'
import { Comment } from '@/store/comment/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import CommentItem from './comment-item'
export interface ICommentItemsListProps {
    leaningId: string
    addComment: UseMutateFunction<unknown, any, object, unknown>
    getLearningCommentParent: UseMutateFunction<unknown, any, object, unknown>
}

export default function CommentItemsList(props: ICommentItemsListProps) {
    const parentComment = useAppSelector(getComments)
    const [numberOfShowedComments, setNumberOfShowedComments] = useState(3)
    const [commentList, setCommentList] = useState(
        parentComment.slice(0, numberOfShowedComments),
    )
    const updateCommentList = () => {
        const newTotal = numberOfShowedComments + 3
        setNumberOfShowedComments(newTotal)
        setCommentList(parentComment.slice(0, newTotal))
    }
    const getReplies = (commentId: string) => {
        const repliesComment: Comment[] = []
        parentComment.forEach((comment: Comment) => {
            if (comment._id === commentId) {
                comment.replies.forEach((reply: Comment) => {
                    repliesComment.push(reply)
                })
            }
        })
        return repliesComment
    }

    useEffect(() => {
        if (parentComment.length !== 0) {
            setCommentList(parentComment.slice(0, numberOfShowedComments))
        } else {
            setCommentList([])
        }
    }, [parentComment])

    return (
        <div>
            {commentList.map((item, index) => {
                return (
                    <div className="space-y-6" key={index}>
                        <CommentItem
                            data={item}
                            replies={getReplies(item._id)}
                            getLearningCommentParent={
                                props.getLearningCommentParent
                            }
                            leaningId={props.leaningId}
                            addComment={props.addComment}
                        />
                        {index !== commentList.length - 1 && <Divider />}
                    </div>
                )
            })}
            {parentComment.length > numberOfShowedComments && (
                <Button
                    className="btn-primary-outline w-full mt-5"
                    onClick={() => updateCommentList()}
                >
                    <div className="font-medium text-[16px] text-center w-full">
                        Show more comments
                    </div>
                </Button>
            )}
        </div>
    )
}
