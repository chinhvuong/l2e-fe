import { RootState } from '@/store'

export const getCourseLabelInfo = (state: RootState) => {
    return {
        _id: state.courseDetail.courseDetail._id,
        name: state.courseDetail.courseDetail.name,
        isBestseller: state.courseDetail.courseDetail.isBestseller,
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
        owner: state.courseDetail.courseDetail.owner,
        name: state.courseDetail.courseDetail.name,
        overview: state.courseDetail.courseDetail.overview,
        isBestseller: state.courseDetail.courseDetail.isBestseller,
        rating: state.courseDetail.courseDetail.rating,
        reviews: state.courseDetail.courseDetail.review,
        students: state.courseDetail.courseDetail.students,
        price: state.courseDetail.courseDetail.price,
        category: state.courseDetail.courseDetail.category,
        language: state.courseDetail.courseDetail.language,
        updatedAt: state.courseDetail.courseDetail.updatedAt,
        thumbnail: state.courseDetail.courseDetail.thumbnail,
    }
}

export const getSidebarInfo = (state: RootState) => {
    return {
        price: state.courseDetail.courseDetail.price,
        thumbnail: state.courseDetail.courseDetail.thumbnail,
        include: state.courseDetail.courseDetail.include,
    }
}

export const getWhatYouWillLearn = (state: RootState) => {
    return state.courseDetail.courseDetail.goals
}

export const getRequirements = (state: RootState) => {
    return state.courseDetail.courseDetail.requirements
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
