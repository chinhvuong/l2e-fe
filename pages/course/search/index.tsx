import { useRouter } from 'next/router'
import { CoursePreview } from '@/api/dto/course.dto'
import { CourseLists } from '@/data/courses'
import { useEffect, useState } from 'react'
import Sidebar from '@/containers/search/sidebar'
import MySearchCourseCard from '@/containers/search/course'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import { InstructorAPI } from '@/api/api-path'

const SearchPage = () => {
    const router = useRouter()
    const [rating, setRating] = useState<number>(0)
    const [dataFilter, setDataFilter] = useState<CoursePreview[]>(CourseLists)
    const [urlPath, setUrlPath] = useState<string>()

    const { mutate: requestApprove, isLoading } = useAPI.getMutation(
        InstructorAPI.CREATE_COURSE + urlPath,
        {
            onSuccess(response) {
                setDataFilter(response)
            },
            onError(error) {
                console.log(error)
            },
        },
    )
    const handleRadioBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(router.query)
        setRating(parseFloat(e.target.value))
        changeUrl('rating', e.target.value)
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
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrlPath(window.location.search)
        }
    }, [window.location.search])
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
                                rating={rating}
                                onRadioBoxChange={handleRadioBox}
                            />
                        </div>
                        <div className="w-full h-full">
                            {!isLoading &&
                                dataFilter.map(
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
