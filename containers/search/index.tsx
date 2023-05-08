import { UserAPI } from '@/api/api-path'
import { CoursePreview, GetAllCoursesResponse } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Divider from '@/components/core/divider'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import Pagination from '@/components/core/pagination'
import Select from '@/components/core/select'
import { Sort, SortLabel } from '@/constants'
import { noop } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

const SearchPageContainer = () => {
    const router = useRouter()
    const [isCourseClicked, setIsCourseClicked] = useState<boolean>(false)
    const [allMyCourses, setAllMyCourses] = useState<GetAllCoursesResponse>(
        {} as GetAllCoursesResponse,
    )
    const [sortBy, setSortBy] = useState<string>('')
    const [pageNumber, setPageNumber] = useState(1)
    const limit = 10
    const [totalPage, setTotalPage] = useState(1)
    const dispatch = useDispatch()

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
            `${UserAPI.GET_ALL_COURSES}?page=${pageNumber - 1}&limit=${limit}${
                router.query.query !== '' ? '&query=' + router.query.query : ''
            }${sortBy !== '' ? '&sort=' + getSortParams() : ''}`,
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
        if (router.query.query !== '') {
            newQuery.query = router.query.query
        }
        if (sortBy !== '') {
            newQuery.sort = getSortParams()
        }
        if (Object.keys(newQuery).length !== 0) {
            router.push(
                {
                    pathname: '/course/search',
                    query: newQuery,
                },
                undefined,
                { shallow: true },
            )
        }
    }

    useEffect(() => {
        getAllMyCourses({})
        changeURL()
    }, [sortBy, router.query.query, pageNumber])

    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    const isLoading = useMemo(() => {
        return isLoadingAllMyCourses || isCourseClicked
    }, [isLoadingAllMyCourses, isCourseClicked])

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <div className="h-full">
                {isLoading ||
                (allMyCourses &&
                    allMyCourses?.data &&
                    allMyCourses.data.length === 0) ? (
                    <div className="flex justify-center pt-5 pb-14">
                        <div>
                            <div className="text-2xl font-bold">
                                {`Sorry, we couldn't find any results for "${router.query.query}"`}
                            </div>
                            <div className="text-lg font-semibold mt-4 mb-2">
                                Try adjusting your search. Here are some ideas:
                            </div>
                            <ul className="space-y-1">
                                <li className="list-disc list-inside ml-2">
                                    Make sure all words are spelled correctly
                                </li>
                                <li className="list-disc list-inside ml-2">
                                    Try different search terms
                                </li>
                                <li className="list-disc list-inside ml-2">
                                    Try more general search terms
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="px-24 under_lg:px-10 space-y-5">
                        <div className="text-2xl font-bold">
                            {`${allMyCourses.total} ${
                                allMyCourses.total < 2 ? 'result' : 'results'
                            } for "${router.query.query}"`}
                        </div>
                        <div className="flex space-x-10">
                            <div className="w-[300px]">
                                <Select
                                    label="Sort by"
                                    selectList={Object.values(SortLabel)}
                                    placeholder="Select sorting"
                                    selected={sortBy}
                                    setSelected={handleSortChange}
                                />
                            </div>
                            <div>
                                {!isLoading &&
                                    allMyCourses &&
                                    allMyCourses?.data &&
                                    allMyCourses.data.map(
                                        (
                                            course: CoursePreview,
                                            index: number,
                                        ) => {
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
                                                        clickMode={'view'}
                                                        setClicked={
                                                            setIsCourseClicked
                                                        }
                                                    />
                                                    {index !==
                                                        allMyCourses.data
                                                            .length -
                                                            1 && <Divider />}
                                                </div>
                                            )
                                        },
                                    )}
                                <Pagination
                                    totalPage={totalPage}
                                    setPageNumber={setPageNumber}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default SearchPageContainer
