import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dataUser } from '@/data/users'
import { Rating } from './types'

const initialState = {
    detailRating: {
        _id: '',
        course: '',
        content: '',
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: dataUser,
    },
    ratinglist: [] as Rating[],
}

export const ratingSlice = createSlice({
    name: 'ratingSlice',
    initialState,
    reducers: {
        UpdateRatingsState(state, action: PayloadAction<Rating[]>) {
            const newList: Rating[] = []
            action.payload.forEach((item) => {
                newList.push(item)
            })
            state.ratinglist = newList
        },
        UpdateRatingDetailState(state, action: PayloadAction<Rating>) {
            const newRating: Rating = action.payload
            state.detailRating = newRating
        },
    },
})

export const { UpdateRatingsState, UpdateRatingDetailState } =
    ratingSlice.actions

export default ratingSlice.reducer
