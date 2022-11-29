import VerticalCourseCard from '@/components/core/vertical-course-card'
import { CoursePreview } from '@/api/dto/course.dto'
import Button from '@/components/core/button'

export default function MyCoursesContainer() {
    const mintCourse = () => {}

    const data: CoursePreview[] = [
        {
            _id: '635761a7464c91f76922339f',
            name: '100 Days of Code: The Complete Python Pro Bootcamp for 2022',
            price: 234,
            rating: 0,
            students: 0,
            courseId: 1,
            author: {
                _id: '6379136f9212c6d10a1d7f0b',
                __v: 0,
                avatar: null,
                bio: null,
                createdAt: '2022-11-19T17:33:35.190Z',
                name: null,
                nonce: 0,
                rating: 0,
                title: null,
                updatedAt: '2022-11-27T16:27:20.211Z',
                walletAddress: '0x9f6A4b91Ed1d6cAF84a35b93790123d81c3ec0CB',
            },
            category: {
                _id: '6357fe17934b49535b9c7af9',
                name: 'IT',
                slug: 'it',
                banner: 'https://dlearn-storage.herokuapp.com/research-and-development-1665840546844-201407850.png',
                thumbnail:
                    'https://dlearn-storage.herokuapp.com/research-and-development-1665840546844-201407850.png',
                color: '#2267B5',
                __v: 0,
                createdAt: '2022-10-25T15:17:43.381Z',
                updatedAt: '2022-10-25T15:17:43.381Z',
            },
            ratingCount: 0,
        },
    ]
    return (
        <div>
            <div className="bg-second h-[550px] flex justify-center items-center text-white space-x-10 px-14">
                <div className="flex justify-center mt-6">
                    {data.map((item, index) => (
                        <div className="w-[400px]" key={index}>
                            <VerticalCourseCard
                                key={item._id}
                                data={item}
                                className="mx-[8px]"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center text-white mt-10">
                    <Button onClick={() => mintCourse()}>Mint course</Button>
                </div>
            </div>
            <img src="/svgs/curvedPart.svg" alt="" className="w-full" />
        </div>
    )
}
