import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import CommentItemsList from '@/containers/course-detail/comment/components/comment-items-list'
import { dataRatings } from '@/data/ratings'
import { useEffect, useState } from 'react'
import { useLearningCourseContext } from '../learning-course-context'
import CommentForm from '@/containers/course-detail/comment/components/comment-form'
import { Comment } from '@/store/comment/types'
import { LESSON_ID } from '@/constants/localStorage'
import { UpdateCommentsState } from '@/store/comment'
import { useAppDispatch } from '@/hooks'

export interface ILearningCommentsDetailProps {}

export default function LearningCommentsDetail() {
    const dispatch = useAppDispatch()
    const {
        parentComment,
        // getLearningCommentParent
    } = useLearningCourseContext()
    const [lessonId, setLessonId] = useState('')
    const {
        mutate: getLearningCommentParent,
        isLoading: isLoadingLearningCommentParent,
    } = useAPI.getMutation(LearnerAPI.COMMENT + '?lessonId=' + lessonId, {
        onError: () => {},
        onSuccess: (response) => {
            dispatch(UpdateCommentsState(response?.data))
        },
    })
    const { mutate: addComment, isLoading: isLoadingCreateComment } =
        useAPI.post(LearnerAPI.COMMENT, {
            onError: () => {},
            onSuccess: (response) => {
                getLearningCommentParent({})
            },
        })
    function createParentComment(content: string) {
        addComment({
            lesson: lessonId,
            content: content,
        })
    }
    useEffect(() => {
        if (lessonId !== localStorage.getItem(LESSON_ID)) {
            setLessonId(localStorage.getItem(LESSON_ID) ?? '')
        } else {
            if (localStorage.getItem(LESSON_ID) !== undefined) {
                getLearningCommentParent({})
            }
        }
    }, [lessonId, localStorage.getItem(LESSON_ID)])
    return (
        <div className="space-y-10">
            <div className="flex justify-center space-x-7 under_lg:flex-wrap under_lg:justify-center mt-3">
                <CommentForm
                    handleSubmit={createParentComment}
                    // hasCancelButton={false}
                />
            </div>
            {parentComment.length > 0 && (
                <CommentItemsList
                    data={parentComment}
                    leaningId={lessonId}
                    getLearningCommentParent={getLearningCommentParent}
                    addComment={addComment}
                />
            )}
        </div>
    )
}
