import { RootState } from '..'
import { Rating } from './types'
export const getRatings = (state: RootState) => {
    return state.ratings.ratinglist
}

export const getCommentDetail = (state: RootState) => {
    return state.ratings.detailRating
}

export const getOverViewRatings = (state: RootState) => {
    return state.ratings.overviewRating
}

export const getTotalRatings = (state: RootState) => {
    return state.ratings.totalRating
}
