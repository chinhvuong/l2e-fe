import { LearnerAPI } from '@/api/api-path'
import { CoursePreview, GetAllCoursesResponse } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Divider from '@/components/core/divider'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import Select from '@/components/core/select'
import { Sort, SortLabel } from '@/constants'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { useEffect, useMemo, useState } from 'react'
import Search from '../../instructor/components/search'

export default function LearnerCoursesContainer() {
    const [isCourseClicked, setIsCourseClicked] = useState<boolean>(false)
    const [search, setSearch] = useState('')
    const [allMyCourses, setAllMyCourses] = useState<GetAllCoursesResponse>(
        {} as GetAllCoursesResponse,
    )
    const [sortBy, setSortBy] = useState<string>('')

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
            `${LearnerAPI.GET_ALL_MY_ENROLL_COURSES}${
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

    useEffect(() => {
        getAllMyCourses({})
    }, [search, sortBy])

    useHideFirstEnterLoadingScreen()

    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    const isLoading = useMemo(() => {
        return isLoadingAllMyCourses || isCourseClicked
    }, [isLoadingAllMyCourses, isCourseClicked])

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <div className="h-full mt-9">
                <div className="flex justify-between px-14">
                    <div className="font-semibold text-[30px]">Courses</div>
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
                            {!isLoading &&
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
                                                    clickMode={'view'}
                                                    setClicked={
                                                        setIsCourseClicked
                                                    }
                                                    className="py-6"
                                                />
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
