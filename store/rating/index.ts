import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dataUser } from '@/data/users'
import { Rating, RatingOverView } from './types'

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
    overviewRating: {
        one: 0,
        two: 0,
        three: 1,
        four: 0,
        five: 0,
        overview: 3,
    },
    totalRating: 0,
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
        UpdateOverviewRatingState(
            state,
            action: PayloadAction<RatingOverView>,
        ) {
            state.totalRating =
                action.payload.one +
                action.payload.two +
                action.payload.three +
                action.payload.four +
                action.payload.five
            state.overviewRating = action.payload
        },
    },
})

export const {
    UpdateRatingsState,
    UpdateRatingDetailState,
    UpdateOverviewRatingState,
} = ratingSlice.actions

export default ratingSlice.reducer
