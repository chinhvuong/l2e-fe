export enum apiPath {
    REFRESH = '/auth/refresh',
    LOGIN = '/auth/login',
    UPLOAD_SINGLE_FILE = '/upload-single-file',
    UPLOAD_MULTI_FILES = '/upload-multi-files',
    GET_ALL_COURSES = '/course',
    GET_ALL_MY_COURSES = '/course/manage/own-courses',
    GET_ALL_MY_ENROLL_COURSES = '/course/my/enroll-courses',
    CREATE_COURSE = '/course',
    UPDATE_COURSE = '/course/',
    GET_MY_COURSE_DETAIL = '/course/manage/own-courses/',
    GET_CATEGORY = '/category',
    GET_MINT_SIGNATURE = '/course/request-mint-signature',
    GET_COURSE_DETAIL = '/course/preview/',
    CHECK_ENROLL = '/course/check-enroll/',
    REQUEST_APPROVE = '/course/manage/own-courses/send-approve-request'
}
