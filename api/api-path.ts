export const AuthAPI = {
    LOGIN: '/auth/login',
}

export const FileAPI = {
    UPLOAD_SINGLE_FILE: '/upload/upload-one',
    UPLOAD_MULTI_FILES: '/upload/upload-multi',
}

export const UserAPI = {
    GET_ALL_COURSES: '/course',
    GET_CATEGORY: '/category',
}

export const LearnerAPI = {
    GET_ALL_MY_ENROLL_COURSES: '/course/my/enroll-courses',
    CHECK_ENROLL: '/course/check-enroll/',
    GET_COURSE_DETAIL: '/course/preview/',
    GET_LEARNING_COURSE_DETAIL: '/course/learn',
}

export const InstructorAPI = {
    GET_ALL_MY_COURSES: '/course/manage/own-courses',
    CREATE_COURSE: '/course',
    UPDATE_COURSE: '/course/',
    GET_MY_COURSE_DETAIL: '/course/manage/own-courses/',
    GET_SECTIONS: '/section/manage/get-sections/',
    UPSERT_SECTIONS: '/section/upsert-sections/',
    GET_LESSONS: '/lesson/manage/get-lessons',
    UPSERT_LESSONS: '/lesson/upsert-lesions/',
    REQUEST_APPROVE: '/course/manage/own-courses/send-approve-request',
    GET_MINT_SIGNATURE: '/course/request-mint-signature',
    CREATE_QUESTIONS: '/question/create-batch',
    GET_QUESTIONS: '/question/manage/get-question',
    EDIT_QUESTION: '/question',
    CREAT_QUIZ: '/quiz',
    GET_QUIZZES: '/quiz/manage/get-quizzes',
    DELETE_QUIZ: '/quiz/manage/',
    DELETE_QUESTION: '/question/manage/',
}
