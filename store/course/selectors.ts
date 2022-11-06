import { RootState } from '@/store'

export const getCourseLabelInfo = (state: RootState) => {
    return {
        _id: state.courseDetail.courseDetail._id,
        name: state.courseDetail.courseDetail.name,
        rating: state.courseDetail.courseDetail.rating,
        reviews: state.courseDetail.courseDetail.review,
        students: state.courseDetail.courseDetail.students,
        price: state.courseDetail.courseDetail.price,
        category: state.courseDetail.courseDetail.category,
    }
}

export const getCourseOverviewInfo = (state: RootState) => {
    return {
        _id: state.courseDetail.courseDetail._id,
        name: state.courseDetail.courseDetail.name,
        overview: state.courseDetail.courseDetail.overview,
        rating: state.courseDetail.courseDetail.rating,
        reviews: state.courseDetail.courseDetail.review,
        students: state.courseDetail.courseDetail.students,
        price: state.courseDetail.courseDetail.price,
        category: state.courseDetail.courseDetail.category,
        language: state.courseDetail.courseDetail.language,
        thumbnail: state.courseDetail.courseDetail.thumbnail,
        updatedAt: state.courseDetail.courseDetail.updatedAt,
    }
}

export const getSidebarInfo = (state: RootState) => {
    return {
        price: state.courseDetail.courseDetail.price,
        thumbnail: state.courseDetail.courseDetail.thumbnail,
        include: state.courseDetail.courseDetail.include,
    }
}

export const getCourseName = (state: RootState) => {
    return state.courseDetail.courseDetail.name
}

export const getDescription = (state: RootState) => {
    return state.courseDetail.courseDetail.description
}

export const getReviews = (state: RootState) => {
    return state.courseDetail.reviews
}

export const getCourseIncludeList = (state: RootState) => {
    return state.courseDetail.courseDetail.include
}
