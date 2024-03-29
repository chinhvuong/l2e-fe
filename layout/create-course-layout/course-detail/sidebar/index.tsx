import { InstructorAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import Button from '@/components/core/button'
import ValidateModal, {
    IValidateContent,
} from '@/components/core/modal/validate-modal'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import MintBtn from '@/containers/instructor/components/mint-btn'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    getCurriculumLecturesForm,
    getCurriculumSectionsForm,
} from '@/store/course/curriculum/selectors'
import {
    getDescriptionLength,
    getMyCourseDetail,
} from '@/store/course/selectors'
import { updateGlobalLoadingState } from '@/store/user'
import { getBioLength, getUserProfile } from '@/store/user/selectors'
import {
    faFileCircleQuestion,
    faHome,
    faList,
    faQuestion,
    faUser,
    faUsersViewfinder,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noop } from 'lodash'
import Router, { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

export interface ISidebarProps {}

export default function Sidebar() {
    const courseDetail = useAppSelector(getMyCourseDetail)
    const descriptionLength = useAppSelector(getDescriptionLength)
    const sections = useAppSelector(getCurriculumSectionsForm)
    const lectures = useAppSelector(getCurriculumLecturesForm)
    const userProfile = useAppSelector(getUserProfile)
    const bioLength = useAppSelector(getBioLength)
    const dispatch = useAppDispatch()

    const {
        getCourseDetail,
        currentTab,
        setCurrentTab,
        handleUpdateCourseDetail,
    } = useCreateCourseContext()

    const menu = [
        'Landing page',
        'Intended learners',
        'Curriculum',
        'Questions',
        'Quizzes',
        'Profile',
    ]

    const menuTarget = [
        'landing-page',
        'intended-learners',
        'curriculum',
        'question',
        'quiz',
        'profile',
    ]
    const router = useRouter()
    const [courseId, setCourseId] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [validateCourseContent, setValidateCourseContent] = useState(
        {} as IValidateContent,
    )

    useEffect(() => {
        setCourseId(getCourseId())
    }, [router.query.slug])

    const getCourseId = () => {
        if (typeof router.query.slug === 'object') {
            return router.query.slug[0]
        }
        return router.query.slug
    }

    const goToMenuTarget = (index: number) => {
        if (currentTab !== menuTarget[index]) {
            setCurrentTab(menuTarget[index])
            Router.push(`/create-course/${courseId}/${menuTarget[index]}`)
        }
    }

    const getSidebarIcon = (name: string, index: number) => {
        switch (name) {
            case 'Landing page':
                return (
                    <div className="w-[25px] flex justify-center">
                        <FontAwesomeIcon
                            icon={faHome}
                            className={`text-[20px] ${
                                currentTab === menuTarget[index]
                                    ? 'text-white'
                                    : 'text-black'
                            }`}
                        />
                    </div>
                )
            case 'Intended learners':
                return (
                    <div className="w-[25px] flex justify-center">
                        <FontAwesomeIcon
                            icon={faUsersViewfinder}
                            className={`text-[20px] ${
                                currentTab === menuTarget[index]
                                    ? 'text-white'
                                    : 'text-black'
                            }`}
                        />
                    </div>
                )
            case 'Curriculum':
                return (
                    <div className="w-[25px] flex justify-center">
                        <FontAwesomeIcon
                            icon={faList}
                            className={`text-[20px] ${
                                currentTab === menuTarget[index]
                                    ? 'text-white'
                                    : 'text-black'
                            }`}
                        />
                    </div>
                )
            case 'Questions':
                return (
                    <div className="w-[25px] flex justify-center">
                        <FontAwesomeIcon
                            icon={faQuestion}
                            className={`text-[20px] ${
                                currentTab === menuTarget[index]
                                    ? 'text-white'
                                    : 'text-black'
                            }`}
                        />
                    </div>
                )
            case 'Quizzes':
                return (
                    <div className="w-[25px] flex justify-center">
                        <FontAwesomeIcon
                            icon={faFileCircleQuestion}
                            className={`text-[20px] ${
                                currentTab === menuTarget[index]
                                    ? 'text-white'
                                    : 'text-black'
                            }`}
                        />
                    </div>
                )
            case 'Profile':
                return (
                    <div className="w-[25px] flex justify-center">
                        <FontAwesomeIcon
                            icon={faUser}
                            className={`text-[20px] ${
                                currentTab === menuTarget[index]
                                    ? 'text-white'
                                    : 'text-black'
                            }`}
                        />
                    </div>
                )
        }
    }

    const validateCourse = () => {
        const validateCourse = {
            landingPage: [] as string[],
            intendedLearners: [] as string[],
            curriculum: [] as string[],
            userProfile: [] as string[],
        }
        if (courseDetail.name === '') {
            validateCourse.landingPage.push('Have a course title')
        }
        if (courseDetail.overview === '') {
            validateCourse.landingPage.push('Have a course subtitle')
        }
        if (courseDetail.price === 0 || courseDetail.price === null) {
            validateCourse.landingPage.push(
                'Have a price for your course and not free',
            )
        }
        if (!courseDetail.finalTest) {
            validateCourse.landingPage.push('Have a final test')
        }
        if (descriptionLength < 200) {
            validateCourse.landingPage.push(
                'Have a course description with at least 200 words',
            )
        }
        if (courseDetail.thumbnail === null) {
            validateCourse.landingPage.push('Upload a course thumbnail')
        }
        if (courseDetail.promotionalVideo === null) {
            validateCourse.landingPage.push('Upload a promotional video')
        }
        if (
            courseDetail.goals.length === 0 ||
            courseDetail.goals.filter((goal: any) => goal === '').length > 0
        ) {
            validateCourse.intendedLearners.push(
                "Specify at least 4 of your course's learning objectives and no fields left blank",
            )
        }
        if (
            courseDetail.requirements.length === 0 ||
            courseDetail.requirements.filter(
                (requirement: any) => requirement === '',
            ).length > 0
        ) {
            validateCourse.intendedLearners.push(
                'Specify any course requirements or prerequisites and no fields left blank.',
            )
        }
        let lessonCount = 0
        lectures.map((lecture: any) => (lessonCount += lecture.length))
        if (lessonCount < 3) {
            validateCourse.curriculum.push('Have at least 3 lectures')
        }
        sections.map((section) => {
            if (section.name === '') {
                validateCourse.curriculum.push("Fill all sections's titles")
            }
        })
        let missingQuizContent = false
        lectures.map((lecture) => {
            lecture.map((el) => {
                if (el.name === '') {
                    validateCourse.curriculum.push("Fill all lectures's titles")
                }
                if (el.quizzes.length <= 0) {
                    missingQuizContent = true
                }
            })
        })
        let missingMainContent = false
        lectures.map((lecture: any) => {
            if (lecture.length === 0) {
                missingMainContent = true
            } else {
                lecture.map((lesson: any) => {
                    if (lesson.media === '') {
                        missingMainContent = true
                    }
                })
            }
        })
        if (missingQuizContent) {
            validateCourse.curriculum.push(
                'Each lecture must have at least one quiz',
            )
        }
        if (missingMainContent) {
            validateCourse.curriculum.push('Have content for all lectures')
        }
        if (userProfile.name === '' || userProfile.name === null) {
            validateCourse.userProfile.push('Have a user name')
        }
        if (userProfile.title === '' || userProfile.title === null) {
            validateCourse.userProfile.push('Have a user title')
        }
        if (userProfile.avatar === '' || userProfile.avatar === null) {
            validateCourse.userProfile.push('Have a user avatar')
        }
        if (bioLength < 100) {
            validateCourse.userProfile.push(
                'Have a user bio with at least 100 words',
            )
        }
        return validateCourse
    }

    const { mutate: requestApprove, isLoading: isLoadingRequestApprove } =
        useAPI.post(InstructorAPI.REQUEST_APPROVE, {
            onSuccess: () => {
                getCourseDetail({})
            },
            onError: noop,
        })

    const handleShowValidateModal = (value: boolean) => {
        const validate = validateCourse()
        if (
            validate.landingPage.length === 0 &&
            validate.intendedLearners.length === 0 &&
            validate.curriculum.length === 0 &&
            validate.userProfile.length === 0
        ) {
            if (value) {
                handleUpdateCourseDetail()
                requestApprove({ id: courseDetail._id, notes: [] })
            }
        } else {
            setValidateCourseContent(validate)
            setShowModal(value)
        }
    }

    const canRequestApprove = useMemo(() => {
        if (courseDetail.lastApproveRequestAt === null) {
            return true
        } else {
            const lastApproveRequest = new Date(
                courseDetail.lastApproveRequestAt,
            )
            const currentDate = new Date()

            const diff =
                (currentDate.getTime() - lastApproveRequest.getTime()) / 3600000

            if (diff > 12) {
                return true
            }
            return false
        }
    }, [courseDetail])

    const handleChangeTab = (index: number) => {
        goToMenuTarget(index)
    }

    useEffect(() => {
        dispatch(updateGlobalLoadingState(isLoadingRequestApprove))
    }, [isLoadingRequestApprove])

    return (
        <>
            <div className="flex flex-col justify-start w-[320px] under_xl:w-fit pt-7">
                <div className="space-y-2 flex flex-col">
                    {menu.map((item, index) => {
                        return (
                            <div
                                className={`cursor-pointer rounded-r-full py-3 px-5 font-medium text-lg ${
                                    currentTab === menuTarget[index]
                                        ? 'bg-primary text-white hover:bg-primary'
                                        : 'hover:bg-divider'
                                }`}
                                key={index}
                                onClick={() => handleChangeTab(index)}
                            >
                                <div className="flex space-x-3 items-center">
                                    {getSidebarIcon(item, index)}
                                    <div
                                        className={`under_xl:hidden ${
                                            currentTab === menuTarget[index]
                                                ? 'text-white'
                                                : 'text-black'
                                        }`}
                                    >
                                        {item}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {courseDetail.approved ? (
                    <>
                        <div className="under_xl:text-xs under_xl:py-2 under_xl:px-4 rounded-[80px] py-[12px] px-[30px] shadow-sm font-semibold w-full flex justify-center bg-green-500 text-white cursor-not-allowed mt-10 mb-5">
                            Approved!
                        </div>
                        {!courseDetail.courseId ? (
                            <MintBtn id={courseDetail._id} />
                        ) : (
                            <div className="under_xl:text-xs under_xl:py-2 under_xl:px-4 rounded-[80px] py-[12px] px-[30px] shadow-sm font-semibold w-full flex justify-center bg-green-500 text-white cursor-not-allowed">
                                Minted!
                            </div>
                        )}
                    </>
                ) : canRequestApprove ? (
                    <Button
                        onClick={() => handleShowValidateModal(!showModal)}
                        className="mt-10"
                    >
                        <div className="font-semibold w-full flex justify-center">
                            <span className="under_xl:hidden block">
                                Submit for Review
                            </span>
                            <span className="under_xl:block hidden">
                                Submit
                            </span>
                        </div>
                    </Button>
                ) : (
                    <Button className="mt-10" disabled>
                        <div className="font-semibold w-full flex justify-center">
                            Waiting for Review...
                        </div>
                    </Button>
                )}
                <ValidateModal
                    isShow={showModal}
                    setIsShow={setShowModal}
                    validateContent={validateCourseContent}
                />
            </div>
        </>
    )
}
