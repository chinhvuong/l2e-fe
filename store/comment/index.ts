import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment } from './types'

const initialState = {
    detailComment: {
        _id: '',
        lesson: '',
        content: '',
        like: 0,
        level: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        replies: [] as Comment[],
        user: {},
    },
    commentlist: [] as Comment[],
}

export const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {
        UpdateCommentsState(state, action: PayloadAction<Comment[]>) {
            const newList: Comment[] = []
            action.payload.forEach((item) => {
                newList.push(item)
            })
            state.commentlist = newList
        },
        UpdateCommentDetailState(state, action: PayloadAction<Comment>) {
            const newComment: Comment = action.payload
            state.detailComment = newComment
        },
    },
})

export const { UpdateCommentsState, UpdateCommentDetailState } =
    commentSlice.actions

export default commentSlice.reducer
