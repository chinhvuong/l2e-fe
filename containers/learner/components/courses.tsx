import { LearnerAPI } from '@/api/api-path'
import { CoursePreview, GetAllCoursesResponse } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import Divider from '@/components/core/divider'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import Pagination from '@/components/core/pagination'
import Select from '@/components/core/select'
import { Sort, SortLabel } from '@/constants'
import { useAppDispatch } from '@/hooks'
import { updateGlobalLoadingState } from '@/store/user'
import { noop } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Search from '../../../components/common/search'

export default function LearnerCoursesContainer() {
    const [isCourseClicked, setIsCourseClicked] = useState<boolean>(false)
    const [search, setSearch] = useState('')
    const [allMyCourses, setAllMyCourses] = useState<GetAllCoursesResponse>(
        {} as GetAllCoursesResponse,
    )
    const [sortBy, setSortBy] = useState<string>('')
    const [pageNumber, setPageNumber] = useState(1)
    const limit = 10
    const [totalPage, setTotalPage] = useState(1)
    const router = useRouter()
    const dispatch = useAppDispatch()

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
            `${LearnerAPI.GET_ALL_MY_ENROLL_COURSES}?page=${
                pageNumber - 1
            }&limit=${limit}${search !== '' ? '&query=' + search : ''}${
                sortBy !== '' ? '&sort=' + getSortParams() : ''
            }`,
            {
                onError: noop,
                onSuccess: (response) => {
                    setAllMyCourses(response)
                    setTotalPage(Math.ceil(response.total / limit))
                },
            },
        )

    const changeURL = () => {
        const newQuery: any = {}
        newQuery.page = pageNumber
        newQuery.limit = limit
        if (search !== '') {
            newQuery.query = search
        }
        if (sortBy !== '') {
            newQuery.sort = getSortParams()
        }
        router.push(
            {
                pathname: '/learner/courses',
                query: newQuery,
            },
            undefined,
            { shallow: true },
        )
    }

    useEffect(() => {
        getAllMyCourses({})
        changeURL()
    }, [search, sortBy, pageNumber])

    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    const isLoading = useMemo(() => {
        return isLoadingAllMyCourses || isCourseClicked
    }, [isLoadingAllMyCourses, isCourseClicked])

    useEffect(() => {
        dispatch(
            updateGlobalLoadingState(isLoadingAllMyCourses || isCourseClicked),
        )
    }, [isLoadingAllMyCourses, isCourseClicked])

    return (
        <>
            <div className="h-full mt-9 px-[3.5rem] under_xl:px-8">
                <div className="flex items-center justify-between px-4">
                    <div className="font-semibold text-[30px] under_xl:text-2xl">
                        Courses
                    </div>
                </div>
                <div className="flex under_xl:block space-x-5 under_xl:space-x-0 px-4">
                    <Search
                        darkTheme={false}
                        setSearch={setSearch}
                        className="mt-3"
                        placeholder="Search for any courses"
                    />
                    <div className="w-[220px] under_xl:mb-5">
                        <Select
                            label="Sort by"
                            selectList={Object.values(SortLabel)}
                            placeholder="Select sorting"
                            selected={sortBy}
                            setSelected={handleSortChange}
                        />
                    </div>
                </div>
                <div className="space-x-10">
                    <div>
                        {allMyCourses &&
                            allMyCourses?.data &&
                            allMyCourses.data.map(
                                (course: CoursePreview, index: number) => {
                                    return (
                                        <div
                                            key={course._id}
                                            className={`${
                                                index ===
                                                    allMyCourses.data.length -
                                                        1 && 'pb-6'
                                            }`}
                                        >
                                            <HorizontalCourseCard
                                                key={course._id}
                                                data={course}
                                                clickMode={'view'}
                                                setClicked={setIsCourseClicked}
                                            />
                                            {index !==
                                                allMyCourses.data.length -
                                                    1 && <Divider />}
                                        </div>
                                    )
                                },
                            )}
                    </div>
                    {allMyCourses &&
                        allMyCourses?.data &&
                        allMyCourses.data.length === 0 && (
                            <div className="flex justify-center text-xl font-bold my-10">
                                No results found.
                            </div>
                        )}
                </div>
                <Pagination
                    totalPage={totalPage}
                    setPageNumber={setPageNumber}
                />
            </div>
        </>
    )
}
