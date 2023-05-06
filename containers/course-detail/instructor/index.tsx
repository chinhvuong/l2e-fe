import UserProfileDetail from '@/components/common/user-profile-detail'
import { useCourseDetailContext } from '../course-detail-context'

export default function Instructor() {
    const { instructor } = useCourseDetailContext()

    return (
        <>
            {instructor && (
                <div id="instructor-section">
                    <UserProfileDetail data={instructor} />
                </div>
            )}
        </>
    )
}
