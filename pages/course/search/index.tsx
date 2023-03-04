import { UserAPI } from '@/api/api-path'
import { CoursePreview } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import { SortMethods } from '@/api/types'
import LoadingScreen from '@/components/core/animate/loading-screen'
import MySearchCourseCard from '@/containers/search/course'
import Sidebar from '@/containers/search/sidebar'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SearchPage = () => {
    const router = useRouter()
    const [sortType, setSortType] = useState<string>()
    const { data, isLoading } = useAPI.get(
        UserAPI.GET_ALL_COURSES + router.asPath.replace(router.pathname, ''),
        {},
        '',
        {
            refetchOnWindowFocus: false,
        },
    )
    const handleRadioBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(router)
        setSortType(e.target.value)
        switch (e.target.value) {
            case 'Most Rated':
                changeUrl('sort', SortMethods.RATING_DESC)
                break
            case 'Most Enrolled':
                changeUrl('sort', SortMethods.STUDENT_DESC)
                break
            case 'Lowest Price':
                changeUrl('sort', SortMethods.PRICE_ASC)
                break
            default:
            // code block
        }
    }

    const changeUrl = (queryname: string, value: string) => {
        let queryParams
        if (typeof window !== 'undefined') {
            queryParams = new URLSearchParams(window.location.search)
            console.log(window.location.search)
            if (queryParams.has(queryname)) {
                queryParams.set(queryname, value)
            } else {
                queryParams.append(queryname, value)
            }
            router.replace({
                search: queryParams.toString(),
            })
        }
    }
    return (
        <div>
            <LoadingScreen isLoading={isLoading} />
            <main id="main">
                <div
                    className=" flex justify-center w-full app-transition main-transition min-h-screen bg-white"
                    id="content"
                >
                    <div className="flex justify-center w-full">
                        <div className="w-[300px] flex justify-center pt-4">
                            <Sidebar
                                sortType={String(sortType)}
                                onRadioBoxChange={handleRadioBox}
                            />
                        </div>
                        <div className="w-full h-full">
                            {!isLoading &&
                                data.data.map(
                                    (course: CoursePreview, index: number) => {
                                        return (
                                            <MySearchCourseCard
                                                key={index}
                                                course={course}
                                            />
                                        )
                                    },
                                )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default SearchPage
