import { RootState } from '@/store'

export const getCourseLabelInfo = (state: RootState) => {
    return {
        _id: state.courseDetail.courseDetail._id,
        name: state.courseDetail.courseDetail.name,
        rating: state.courseDetail.courseDetail.rating,
        reviews: state.courseDetail.courseDetail.reviews,
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
        reviews: state.courseDetail.courseDetail.reviews,
        students: state.courseDetail.courseDetail.students,
        price: state.courseDetail.courseDetail.price,
        category: state.courseDetail.courseDetail.category,
        language: state.courseDetail.courseDetail.language,
        thumbnail: state.courseDetail.courseDetail.thumbnail,
        updatedAt: state.courseDetail.courseDetail.updatedAt,
        author: state.courseDetail.courseDetail.author,
        courseId: state.courseDetail.courseDetail.courseId,
    }
}

export const getSidebarInfo = (state: RootState) => {
    return {
        price: state.courseDetail.courseDetail.price,
        thumbnail: state.courseDetail.courseDetail.thumbnail,
        include: state.courseDetail.courseDetail.include,
        courseId: state.courseDetail.courseDetail.courseId,
        _id: state.courseDetail.courseDetail._id,
    }
}

export const getCourseName = (state: RootState) => {
    return state.courseDetail.courseDetail.name
}

export const getCourseCategoryId = (state: RootState) => {
    return state.courseDetail.courseDetail.category
}

export const getDescription = (state: RootState) => {
    return state.courseDetail.courseDetail.description
}

export const getThumbnail = (state: RootState) => {
    return state.courseDetail.courseDetail.thumbnail
}

export const getGoals = (state: RootState) => {
    return state.courseDetail.courseDetail.goals
}

export const getRequirements = (state: RootState) => {
    return state.courseDetail.courseDetail.requirements
}

export const getReviews = (state: RootState) => {
    return state.courseDetail.reviews
}

export const getCourseIncludeList = (state: RootState) => {
    return state.courseDetail.courseDetail.include
}

export const getMyCourseDetail = (state: RootState) => {
    return state.courseDetail.courseDetail
}

export const getCourseDetailState = (state: RootState) => {
    return state.courseDetail.isNewData
}

export const getEnrollStatusState = (state: RootState) => {
    return state.courseDetail.isEnroll
}

export const getSaveCourseState = (state: RootState) => {
    return state.courseDetail.isSaved
}

export const getCreatingCourseState = (state: RootState) => {
    return state.courseDetail.isCreatingCourse
}

export const getCanCreateCourseState = (state: RootState) => {
    return state.courseDetail.canCreateCourse
}
