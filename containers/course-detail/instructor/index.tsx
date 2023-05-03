import UserProfileDetail from '@/components/common/user-profile-detail'
import { useCourseDetailContext } from '../course-detail-context'

export default function Instructor() {
    const { instructor } = useCourseDetailContext()

    return (
        <>
            {instructor && (
                <div id="instructor-section">
                    <div className="font-semibold text-[26px] mb-3">
                        Instructor
                    </div>
                    <UserProfileDetail data={instructor} />
                </div>
            )}
        </>
    )
}
