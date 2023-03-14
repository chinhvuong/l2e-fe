import { InstructorAPI, UserAPI } from '@/api/api-path'
import {
    CoursePreview,
    GetCategoryResponse,
    GetMintSignatureResponse,
} from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import { Category } from '@/constants/interfaces'
import {
    CATEGORY,
    CATEGORY_NAME_LIST,
    COURSE_ID,
} from '@/constants/localStorage'
import { createCourse } from '@/hooks/coursedex'
import { noop } from 'lodash'
import Router, { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useSigner } from 'wagmi'
import { goerli } from 'wagmi/chains'
import Search from './search'
import { GetAllCoursesResponse } from '@/api/dto/course.dto'
import Select from '@/components/core/select'
import { Sort, SortLabel } from '@/constants'
import { useAppDispatch } from '@/hooks'
import { updateIdState, updateLoadingState } from '@/store/course'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'

export default function InstructorCoursesContainer() {
    const [requireinfo, setRequireinfo] = useState<GetMintSignatureResponse>()
    const [courseId, setCourseId] = useState<string>('')
    const [isCourseClicked, setIsCourseClicked] = useState<boolean>(false)
    const [search, setSearch] = useState('')
    const [allMyCourses, setAllMyCourses] = useState<GetAllCoursesResponse>(
        {} as GetAllCoursesResponse,
    )
    const [sortBy, setSortBy] = useState<string>('')
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { mutate: getSignatureMint, isLoading: isLoadingGetSignatureMint } =
        useAPI.getMutation(
            InstructorAPI.GET_MINT_SIGNATURE + '?id=' + courseId,
            {
                onError: () => {},
                onSuccess: (response) => {
                    setRequireinfo(response)
                },
            },
        )

    const { mutate: getCategory, isLoading: isLoadingGetCategory } =
        useAPI.getMutation(UserAPI.GET_CATEGORY, {
            onError: noop,
            onSuccess: (response: GetCategoryResponse) => {
                const category = response.data.map(
                    (item: Category) => item.name,
                )
                localStorage.setItem(CATEGORY, JSON.stringify(response.data))
                localStorage.setItem(
                    CATEGORY_NAME_LIST,
                    JSON.stringify(category),
                )
            },
        })

    useEffect(() => {
        getCategory({})
    }, [])

    useHideFirstEnterLoadingScreen()

    const { data: signer, isLoading: isLoadingSigner } = useSigner({
        chainId: goerli.id,
    })

    const getSortParams = () => {
        switch (sortBy) {
            case SortLabel.PRICE_ASC:
                return Sort.PRICE_ASC
            case SortLabel.RATING_ASC:
                return Sort.RATING_ASC
            case SortLabel.STUDENT_ASC:
                return Sort.STUDENT_ASC
            case SortLabel.PRICE_DESC:
                return Sort.PRICE_DESC
            case SortLabel.RATING_DESC:
                return Sort.RATING_DESC
            case SortLabel.STUDENT_DESC:
                return Sort.STUDENT_DESC
        }
    }

    const { mutate: getAllMyCourses, isLoading: isLoadingAllMyCourses } =
        useAPI.getMutation(
            `${InstructorAPI.GET_ALL_MY_COURSES}${
                search !== '' ? '?query=' + search : ''
            }${
                sortBy !== ''
                    ? (search === '' ? '?' : '&') + 'sort=' + getSortParams()
                    : ''
            }`,
            {
                onError: () => {},
                onSuccess: (response) => {
                    setAllMyCourses(response)
                },
            },
        )

    const changeURL = () => {
        const newQuery: any = {}
        if (search !== '') {
            newQuery.query = search
        }
        if (sortBy !== '') {
            newQuery.sort = getSortParams()
        }
        router.push(
            {
                pathname: '/instructor/courses',
                query: newQuery,
            },
            undefined,
            { shallow: true },
        )
    }

    useEffect(() => {
        getAllMyCourses({})
        changeURL()
    }, [search, sortBy])

    useEffect(() => {
        if (isCourseClicked) {
            dispatch(updateLoadingState(true))
        }
    }, [isCourseClicked])

    useEffect(() => {
        ;(async () => {
            if (courseId) {
                getSignatureMint({})
                if (requireinfo) {
                    setCourseId('')
                    await createCourse(signer!, requireinfo)
                }
            }
        })()
    }, [requireinfo, courseId])

    const goToCreateCoursePage = () => {
        Router.push('/create-course')
    }

    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    const goToQuestionPage = (course: CoursePreview) => {
        console.log(course._id)
        localStorage.setItem(COURSE_ID, course._id)
        dispatch(updateIdState(course._id))
        Router.push(`${course._id}/question/`)
    }

    const isLoading = useMemo(() => {
        return (
            isLoadingSigner ||
            isLoadingAllMyCourses ||
            isLoadingGetSignatureMint ||
            isLoadingGetCategory
        )
    }, [
        isLoadingSigner,
        isLoadingAllMyCourses,
        isLoadingGetSignatureMint,
        isLoadingGetCategory,
    ])

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <div className="h-full mt-9">
                <div className="flex justify-between px-14">
                    <div className="font-semibold text-[30px]">Courses</div>
                    <div className="text-white">
                        <Button onClick={() => goToCreateCoursePage()}>
                            Create course
                        </Button>
                    </div>
                </div>
                <div className="flex under_xl:block space-x-5 under_xl:space-x-0 px-14">
                    <Search
                        darkTheme={false}
                        setSearch={setSearch}
                        className="mt-3"
                    />
                    <div className="w-[220px]">
                        <Select
                            label="Sort by"
                            selectList={Object.values(SortLabel)}
                            placeholder="Select sorting"
                            selected={sortBy}
                            setSelected={handleSortChange}
                        />
                    </div>
                </div>
                {isLoading ||
                (allMyCourses &&
                    allMyCourses?.data &&
                    allMyCourses.data.length === 0) ? (
                    <div className="text-2xl text-center font-semibold pt-12">
                        No courses found.
                    </div>
                ) : (
                    <div className="space-x-10 px-14">
                        <div>
                            {!isLoadingSigner &&
                                !isLoadingAllMyCourses &&
                                allMyCourses &&
                                allMyCourses?.data &&
                                allMyCourses.data.map(
                                    (course: CoursePreview, index: number) => {
                                        return (
                                            <div
                                                key={course._id}
                                                className={`${
                                                    index ===
                                                        allMyCourses.data
                                                            .length -
                                                            1 && 'pb-6'
                                                }`}
                                            >
                                                <HorizontalCourseCard
                                                    key={course._id}
                                                    data={course}
                                                    clickMode={'edit'}
                                                    setClicked={
                                                        setIsCourseClicked
                                                    }
                                                    showDetail={false}
                                                    showStatus={true}
                                                    className="py-6"
                                                />
                                                <Button
                                                    className="flex gap-4 p-1 text-sm"
                                                    onClick={() =>
                                                        goToQuestionPage(course)
                                                    }
                                                >
                                                    <span>Question Bank</span>
                                                </Button>
                                                {index !==
                                                    allMyCourses.data.length -
                                                        1 && <Divider />}
                                            </div>
                                        )
                                    },
                                )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
