import { RootState } from '..'
import { Comment } from './types'
export const getComments = (state: RootState) => {
    return state.comments.commentlist
}

export const getCommentDetail = (state: RootState) => {
    return state.comments.detailComment
}
export const getRepliesComment = (commentId: string) => (state: RootState) => {
    const repliesComment: Comment[] = []
    state.comments.commentlist.forEach((comment: Comment) => {
        if (comment._id === commentId) {
            comment.replies.forEach((reply: Comment) => {
                repliesComment.push(reply)
            })
        }
    })
    return repliesComment
}
