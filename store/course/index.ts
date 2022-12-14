import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseDetail, CourseDetailState } from './types'
import { dataRatings } from '@/data/ratings'

const initialState: CourseDetailState = {
    courseDetail: {
        include: {
            duration: '',
            resource: '',
            assignments: '',
            certificate: '',
            lifetimeAccess: '',
            device: '',
            articles: '',
            exercise: '',
        },
        _id: '',
        owner: '',
        author: {
            _id: '',
            __v: 0,
            avatar: null,
            bio: null,
            createdAt: '2022-10-25T04:10:15.411Z',
            name: null,
            nonce: 0,
            rating: 0,
            title: null,
            updatedAt: '2022-10-25T04:10:15.411Z',
            walletAddress: '123',
        },
        name: '',
        overview: '',
        description: '',
        price: 0,
        rating: 0,
        reviews: 0,
        language: 'en',
        approved: false,
        requirements: [],
        goals: [],
        thumbnail:
            'https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg',
        category: '',
        createdAt: '2022-10-25T04:10:15.411Z',
        updatedAt: '2022-11-19T17:18:50.955Z',
        __v: 0,
        students: 0,
        courseId: 0,
    },
    // courseDetail: {
    //     include: {
    //         duration: '',
    //         resource: '',
    //         assignments: '',
    //         certificate: '',
    //         lifetimeAccess: '',
    //         device: '',
    //         articles: '',
    //         exercise: '',
    //     },
    //     _id: '635761a7464c91f76922339f',
    //     owner: '0x6AB0Cc7184F27b7ABbA97de7d23B26665a4f7d5C',
    //     name: '100 Days of Code: The Complete Python Pro Bootcamp for 2022',
    //     overview:
    //         'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps',
    //     description:
    //         '<p>Welcome to the Complete Web Development Bootcamp, <strong>the only course you need</strong> to learn to code and become a full-stack web developer. With 150,000+ ratings and a 4.8 average, my Web Development course is one of the HIGHEST??RATED courses in the history of Udemy!??At 65+ hours, this Web Development course is without a doubt the <strong>most comprehensive</strong> web development course available online. Even if you have <strong>zero</strong> programming experience, this course will take you from <strong>beginner to mastery</strong>. Here&#x27;s why:</p><ul><li>The course is taught by the <strong>lead instructor</strong> at the App Brewery, London&#x27;s <strong>leading in-person programming bootcamp</strong>.</li><li>The course has been updated to be <strong>2022 ready</strong> and you&#x27;ll be learning the latest tools and technologies used at large companies such as Apple, Google and Netflix.</li><li>This course doesn&#x27;t cut any corners, there are beautiful <strong>animated explanation videos</strong> and tens of <strong>real-world projects</strong> which you will get to build.</li><li>The curriculum was developed over a period of <strong>four years</strong>, with comprehensive student testing and feedback.</li><li>We&#x27;ve taught over a <strong>million</strong> students how to code and many have gone on to <strong>change their lives</strong> by becoming professional developers or starting their own tech startup.</li><li>You&#x27;ll save yourself <strong>over $12,000</strong> by enrolling, but still get access to the same teaching materials and learn from the same instructor and curriculum as our in-person programming bootcamp.</li><li>The course is <strong>constantly updated</strong> with new content, with new projects and modules determined by students - that&#x27;s you!</li></ul>',
    //     price: 234,
    //     rating: 0,
    //     reviews: 0,
    //     language: 'en',
    //     approved: false,
    //     requirements: [],
    //     goals: [],
    //     thumbnail:
    //         'https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg',
    //     category: '',
    //     createdAt: '2022-10-25T04:10:15.411Z',
    //     updatedAt: '2022-11-19T17:18:50.955Z',
    //     __v: 0,
    //     students: 0,
    //     courseId: 1,
    //     author: {
    //         _id: '6379136f9212c6d10a1d7f0b',
    //         __v: 0,
    //         avatar: null,
    //         bio: null,
    //         createdAt: '2022-11-19T17:33:35.190Z',
    //         name: null,
    //         nonce: 0,
    //         rating: 0,
    //         title: null,
    //         updatedAt: '2022-11-30T14:52:04.358Z',
    //         walletAddress: '0x9f6A4b91Ed1d6cAF84a35b93790123d81c3ec0CB',
    //     },
    // },
    reviews: dataRatings,
    isNewData: false,
    isEnroll: false,
    isSaved: false,
    isCreatingCourse: false,
    canCreateCourse: true,
}

// th??m 1 tr?????ng l?? promotional

export const courseDetailSlice = createSlice({
    name: 'courseDetailSlice',
    initialState,
    reducers: {
        updateCourseName(state, action: PayloadAction<string>) {
            state.courseDetail.name = action.payload
        },
        updateCourseCategory(state, action: PayloadAction<string>) {
            state.courseDetail.category = action.payload
        },
        updateCourseOverview(state, action: PayloadAction<string>) {
            state.courseDetail.overview = action.payload
        },
        updateCourseLanguage(state, action: PayloadAction<string>) {
            state.courseDetail.language = action.payload
        },
        updateCoursePrice(state, action: PayloadAction<number>) {
            state.courseDetail.price = action.payload
        },
        updateCourseDescription(state, action: PayloadAction<string>) {
            state.courseDetail.description = action.payload
        },
        updateCourseThumbnail(state, action: PayloadAction<string>) {
            state.courseDetail.thumbnail = action.payload
        },
        updateCourseGoals(state, action: PayloadAction<string[]>) {
            state.courseDetail.goals = [...action.payload]
        },
        updateCourseRequirements(state, action: PayloadAction<string[]>) {
            state.courseDetail.requirements = [...action.payload]
        },
        updateCourseDetail(state, action: PayloadAction<CourseDetail>) {
            state.courseDetail = { ...action.payload }
        },
        updateGetCourseDetailState(state, action: PayloadAction<boolean>) {
            state.isNewData = action.payload
        },
        updateEnrollStatus(state, action: PayloadAction<boolean>) {
            state.isEnroll = action.payload
        },
        updateSaveCourseState(state, action: PayloadAction<boolean>) {
            state.isSaved = action.payload
        },
        updateCreatingCourseState(state, action: PayloadAction<boolean>) {
            state.isCreatingCourse = action.payload
        },
        updateCanCreateCourseState(state, action: PayloadAction<boolean>) {
            state.canCreateCourse = action.payload
        },
    },
})

export const {
    updateCourseName,
    updateCourseCategory,
    updateCourseOverview,
    updateCourseLanguage,
    updateCoursePrice,
    updateCourseDescription,
    updateCourseThumbnail,
    updateCourseGoals,
    updateCourseRequirements,
    updateCourseDetail,
    updateGetCourseDetailState,
    updateEnrollStatus,
    updateSaveCourseState,
    updateCreatingCourseState,
    updateCanCreateCourseState,
} = courseDetailSlice.actions

export default courseDetailSlice.reducer
