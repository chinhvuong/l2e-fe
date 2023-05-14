import { InstructorAPI, UserAPI } from '@/api/api-path'
import {
    CoursePreview,
    GetAllCoursesResponse,
    GetCategoryResponse,
    GetMintSignatureResponse,
} from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import Pagination from '@/components/core/pagination'
import Select from '@/components/core/select'
import { Sort, SortLabel } from '@/constants'
import { Category } from '@/constants/interfaces'
import { CATEGORY, CATEGORY_NAME_LIST } from '@/constants/localStorage'
import { useAppDispatch } from '@/hooks'
import { createCourse } from '@/hooks/coursedex'
import { updateGlobalLoadingState } from '@/store/user'
import { noop } from 'lodash'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSigner } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import Search from '../../../components/common/search'

export default function InstructorCoursesContainer() {
    const [requireinfo, setRequireinfo] = useState<GetMintSignatureResponse>()
    const [courseId, setCourseId] = useState<string>('')
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

    const { mutate: getSignatureMint, isLoading: isLoadingGetSignatureMint } =
        useAPI.getMutation(
            InstructorAPI.GET_MINT_SIGNATURE + '?id=' + courseId,
            {
                onError: noop,
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

    const { data: signer, isLoading: isLoadingSigner } = useSigner({
        chainId: sepolia.id,
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
            `${InstructorAPI.GET_ALL_MY_COURSES}?page=${
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
    }, [search, sortBy, pageNumber])

    const createNewCourse = async () => {
        if (courseId) {
            getSignatureMint({})
            if (requireinfo) {
                setCourseId('')
                await createCourse(signer!, requireinfo)
            }
        }
    }

    useEffect(() => {
        createNewCourse()
    }, [requireinfo, courseId])

    const goToCreateCoursePage = () => {
        Router.push('/create-course')
    }

    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    useEffect(() => {
        dispatch(
            updateGlobalLoadingState(
                isLoadingSigner ||
                    isLoadingAllMyCourses ||
                    isLoadingGetSignatureMint ||
                    isLoadingGetCategory,
            ),
        )
    }, [
        isLoadingSigner,
        isLoadingAllMyCourses,
        isLoadingGetSignatureMint,
        isLoadingGetCategory,
    ])

    return (
        <>
            <div className="mt-9 px-[3.5rem] under_xl:px-8">
                <div className="flex justify-between px-4">
                    <div className="font-semibold text-[30px]">Courses</div>
                    <div className="text-white">
                        <Button onClick={() => goToCreateCoursePage()}>
                            Create course
                        </Button>
                    </div>
                </div>
                <div className="flex under_xl:block space-x-5 under_xl:space-x-0 px-4">
                    <Search
                        darkTheme={false}
                        setSearch={setSearch}
                        className="mt-3"
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
                                                    allMyCourses.data.length -
                                                        1 && 'pb-6'
                                            }`}
                                        >
                                            <HorizontalCourseCard
                                                key={course._id}
                                                data={course}
                                                clickMode={'edit'}
                                                setClicked={setIsCourseClicked}
                                                showDetail={false}
                                                showStatus={true}
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
