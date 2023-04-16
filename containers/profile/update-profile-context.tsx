import { InstructorAPI, UserAPI } from '@/api/api-path'
import { callAPI } from '@/api/axios-client'
import useAPI from '@/api/hooks/useAPI'
import {
    COURSE_ID,
    QUESTION_ID,
    QUIZ_ID,
    USER_ID,
} from '@/constants/localStorage'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateCertifications } from '@/store/certification'
import { getCertifications } from '@/store/certification/selectors'
import { Certificate } from '@/store/certification/types'
import {
    updateCourseDetail,
    updateDescriptionLength,
    updateSaveCourseState,
} from '@/store/course'
import {
    updateAllCurriculumLectures,
    updateAllCurriculumSections,
} from '@/store/course/curriculum'
import {
    getCurriculumLecturesForm,
    getCurriculumSectionsForm,
} from '@/store/course/curriculum/selectors'
import {
    CurriculumLecture,
    CurriculumSection,
} from '@/store/course/curriculum/types'
import {
    updateAllRequirements,
    updateAllWhatYouWillLearn,
} from '@/store/course/intended-learners'
import { getQuestionDetailInfo } from '@/store/course/question/selectors'
import {
    getFinalTestSelection,
    getMyCourseDetail,
} from '@/store/course/selectors'
import { CourseDetail } from '@/store/course/types'
import { UpdateAllQuestionState } from '@/store/questions'
import { getQuestionsInfo } from '@/store/questions/selectors'
import { QuestionDetailType } from '@/store/questions/types'
import { UpdateQuizzesState } from '@/store/quiz'
import { getQuizDetailInfo, getQuizzez } from '@/store/quiz/selectors'
import { QuizDetailType, QuizSelectType } from '@/store/quiz/types'
import { updateUserInfo } from '@/store/user'
import { getInstructorInfo } from '@/store/user/selectors'
import { User } from '@/store/user/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import { noop } from 'lodash'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
interface IUpdateProfileContext {
    isLoading: boolean
    getUserInfo: UseMutateFunction<unknown, any, object, unknown>
    getCertificationList: UseMutateFunction<unknown, any, object, unknown>
    updateProfile: UseMutateFunction<unknown, any, object, unknown>
    userInfo: User
    certificationsList: Certificate[]
}

export const UpdateProfileContext = createContext<IUpdateProfileContext>(
    {} as IUpdateProfileContext,
)

export const UpdateProfileProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const dispatch = useAppDispatch()
    const [userId, setUserId] = useState('')
    const certificationsList = useAppSelector(getCertifications)
    const userInfo = useAppSelector(getInstructorInfo)
    const { mutate: getUserInfo, isLoading: isLoadingGetUserInfo } =
        useAPI.getMutation(UserAPI.GET_USER_INFO, {
            onError: noop,
            onSuccess(response) {
                setUserId(response._id)
                updateUserInfo(response)
            },
        })
    const {
        mutate: getCertificationList,
        isLoading: isLoadingCertificationList,
    } = useAPI.getMutation(
        UserAPI.GET_LIST_CERTIFICATION + '?userId=' + userId,
        {
            onError: noop,
            onSuccess(response) {
                dispatch(updateCertifications(response?.data))
            },
        },
    )
    const { mutate: updateProfile, isLoading: isLoadingUpdateProfile } =
        useAPI.put(UserAPI.GET_USER_INFO, {
            onError: noop,
            onSuccess(response) {
                getUserInfo({})
            },
        })
    useEffect(() => {
        if (userId !== '') {
            getCertificationList({})
        } else {
            getUserInfo({})
        }
    }, [userId])

    const isLoading = useMemo(() => {
        return (
            isLoadingGetUserInfo ||
            isLoadingCertificationList ||
            isLoadingUpdateProfile
        )
    }, [
        isLoadingGetUserInfo,
        isLoadingCertificationList,
        isLoadingUpdateProfile,
    ])

    return (
        <UpdateProfileContext.Provider
            value={{
                isLoading,
                getUserInfo,
                getCertificationList,
                updateProfile,
                userInfo,
                certificationsList,
            }}
        >
            {children}
        </UpdateProfileContext.Provider>
    )
}

export const useUpdateProfileContext = () => {
    return useContext(UpdateProfileContext) as IUpdateProfileContext
}
