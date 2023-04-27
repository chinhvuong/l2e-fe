import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { Rating } from '@/constants/interfaces'
import { useState } from 'react'
import CommentItem from './comment-item'
import { Comment } from '@/store/comment/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { useAppSelector } from '@/hooks'
import { getComments } from '@/store/comment/selectors'
export interface ICommentItemsListProps {
    leaningId: string
    getLearningCommentParent: UseMutateFunction<unknown, any, object, unknown>
    addComment: UseMutateFunction<unknown, any, object, unknown>
}

export default function CommentItemsList(props: ICommentItemsListProps) {
    const parentComment = useAppSelector(getComments)
    const [commentList, setCommentList] = useState(parentComment)
    const updateCommentList = () => {
        const newList = [...commentList, ...parentComment]
        setCommentList(newList)
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
    if (!commentList) {
        return <></>
    }
    return (
        <div>
            {parentComment.length > 0 &&
                parentComment.map((item, index) => {
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
            <Button
                className="btn-primary-outline w-full mt-5"
                onClick={() => updateCommentList()}
            >
                <div className="font-medium text-[16px] text-center w-full">
                    Show more comments
                </div>
            </Button>
        </div>
    )
}
