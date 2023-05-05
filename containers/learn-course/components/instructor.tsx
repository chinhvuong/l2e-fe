import UserProfileDetail from '@/components/common/user-profile-detail'
import { useLearningCourseContext } from '../learning-course-context'
import { User } from '@/store/user/types'

export interface ILearningInstructorDetailProps {}

export default function LearningInstructorDetail() {
    const { courseDetail } = useLearningCourseContext()
    return <UserProfileDetail data={courseDetail?.author as User} />
}
