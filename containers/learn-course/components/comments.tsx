import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { LESSON_ID } from '@/constants/localStorage'
import CommentForm from '@/containers/course-detail/comment/components/comment-form'
import CommentItemsList from '@/containers/course-detail/comment/components/comment-items-list'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { UpdateCommentsState } from '@/store/comment'
import { getComments } from '@/store/comment/selectors'
import { noop } from 'lodash'
import { useEffect, useState } from 'react'

export interface ILearningCommentsDetailProps {}

export default function LearningCommentsDetail() {
    const dispatch = useAppDispatch()
    const parentComment = useAppSelector(getComments)
    const [lessonId, setLessonId] = useState('')
    const {
        mutate: getLearningCommentParent,
        isLoading: isLoadingLearningCommentParent,
    } = useAPI.getMutation(LearnerAPI.COMMENT + '?lessonId=' + lessonId, {
        onError: noop,
        onSuccess: (response) => {
            dispatch(UpdateCommentsState(response?.data))
        },
    })
    const { mutate: addComment, isLoading: isLoadingCreateComment } =
        useAPI.post(LearnerAPI.COMMENT, {
            onError: noop,
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
            getLearningCommentParent({})
        }
    }, [lessonId, localStorage.getItem(LESSON_ID)])
    return (
        <div className="space-y-10">
            <div className="flex justify-center space-x-7 under_lg:flex-wrap under_lg:justify-center mt-3">
                <CommentForm handleSubmit={createParentComment} />
            </div>
            <CommentItemsList
                leaningId={lessonId}
                addComment={addComment}
                getLearningCommentParent={getLearningCommentParent}
            />
        </div>
    )
}
