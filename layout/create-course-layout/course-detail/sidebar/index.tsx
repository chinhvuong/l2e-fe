import { InstructorAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import ValidateModal, {
    IValidateContent,
} from '@/components/core/modal/validate-modal'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import MintBtn from '@/containers/instructor/components/mint-btn'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateLoadingState } from '@/store/course'
import {
    getCurriculumLecturesForm,
    getCurriculumSectionsForm,
} from '@/store/course/curriculum/selectors'
import {
    getDescriptionLength,
    getMyCourseDetail,
} from '@/store/course/selectors'
import { noop } from 'lodash'
import Router, { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

export interface ISidebarProps {}

export default function Sidebar() {
    const courseDetail = useAppSelector(getMyCourseDetail)
    const descriptionLength = useAppSelector(getDescriptionLength)
    const sections = useAppSelector(getCurriculumSectionsForm)
    const lectures = useAppSelector(getCurriculumLecturesForm)
    const dispatch = useAppDispatch()

    const { getCourseDetail } = useCreateCourseContext()

    const menu = [
        'Landing page',
        'Intended learners',
        'Curriculum',
        'Question',
        'Quiz',
    ]

    const menuTarget = [
        'landing-page',
        'intended-learners',
        'curriculum',
        'question',
        'quiz',
    ]
    const router = useRouter()
    const [courseId, setCourseId] = useState('')
    const [currentTab, setCurrentTab] = useState(() => {
        const list = router.route.split('/')
        return list[list.length - 1]
    })
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
        setCurrentTab(menuTarget[index])
        Router.push(`/create-course/${courseId}/${menuTarget[index]}`)
    }

    const validateCourse = () => {
        console.log(courseDetail.finalTest)
        const validateCourse = {
            landingPage: [] as string[],
            intendedLearners: [] as string[],
            curriculum: [] as string[],
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
        lectures.map((lecture) => {
            lecture.map((el) => {
                if (el.name === '') {
                    validateCourse.curriculum.push("Fill all lectures's titles")
                }
                if (el.quizzes.length <= 0) {
                    validateCourse.curriculum.push(
                        'Each lecture must have at least one quiz',
                    )
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
        if (missingMainContent) {
            validateCourse.curriculum.push('Have content for all lectures')
        }
        return validateCourse
    }

    const { mutate: requestApprove, isLoading: isLoadingRequestApprove } =
        useAPI.post(InstructorAPI.REQUEST_APPROVE, {
            onSuccess: noop,
            onError: noop,
        })

    const handleShowValidateModal = (value: boolean) => {
        const validate = validateCourse()
        if (
            validate.landingPage.length === 0 &&
            validate.intendedLearners.length === 0 &&
            validate.curriculum.length === 0
        ) {
            if (value) {
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
        dispatch(updateLoadingState(true))
        goToMenuTarget(index)
    }

    return (
        <>
            <LoadingScreen isLoading={isLoadingRequestApprove} />
            <div className="flex flex-col justify-start w-[300px] pt-7">
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
                                {item}
                            </div>
                        )
                    })}
                </div>
                {courseDetail.approved ? (
                    <>
                        <Button className="mt-10 mb-5 bg-green-500" disabled>
                            <div className="font-semibold w-full flex justify-center">
                                Approved!
                            </div>
                        </Button>

                        {!courseDetail.courseId ? (
                            <MintBtn id={courseDetail._id} />
                        ) : (
                            <Button className="bg-green-500" disabled>
                                <div className="font-semibold w-full flex justify-center bg-green-500">
                                    Minted!
                                </div>
                            </Button>
                        )}
                    </>
                ) : canRequestApprove ? (
                    <Button
                        onClick={() => handleShowValidateModal(!showModal)}
                        className="mt-10"
                    >
                        <div className="font-semibold w-full flex justify-center">
                            Submit for Review
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
