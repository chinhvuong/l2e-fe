import CommentItemsList from '@/containers/course-detail/comment/components/comment-items-list'
import { dataRatings } from '@/data/ratings'

export interface ILearningCommentsDetailProps {}

export default function LearningCommentsDetail() {
    return (
        <div className="space-y-10">
            <CommentItemsList data={dataRatings} />
        </div>
    )
}
