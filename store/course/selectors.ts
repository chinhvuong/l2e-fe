import { RootState } from '..'

export const getCourseLabelInfo = (state: RootState) => {
    return {
        _id: state.course.courseDetail._id,
        name: state.course.courseDetail.name,
        isBestseller: state.course.courseDetail.isBestseller,
        rating: state.course.courseDetail.rating,
        reviews: state.course.courseDetail.review,
        students: state.course.courseDetail.students,
        price: state.course.courseDetail.price,
        category: state.course.courseDetail.category,
    }
}

export const getCourseOverviewInfo = (state: RootState) => {
    return {
        _id: state.course.courseDetail._id,
        owner: state.course.courseDetail.owner,
        name: state.course.courseDetail.name,
        overview: state.course.courseDetail.overview,
        isBestseller: state.course.courseDetail.isBestseller,
        rating: state.course.courseDetail.rating,
        reviews: state.course.courseDetail.review,
        students: state.course.courseDetail.students,
        price: state.course.courseDetail.price,
        category: state.course.courseDetail.category,
        language: state.course.courseDetail.language,
        updatedAt: state.course.courseDetail.updatedAt,
    }
}

export const getSidebarInfo = (state: RootState) => {
    return state.course.courseDetail.include
}

export const getWhatYouWillLearn = (state: RootState) => {
    return state.course.courseDetail.goals
}

export const getRequirements = (state: RootState) => {
    return state.course.courseDetail.requirements
}

export const getDescription = (state: RootState) => {
    return state.course.courseDetail.description
}

export const getReviews = (state: RootState) => {
    return state.course.reviews
}
