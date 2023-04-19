import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { Rating } from '@/constants/interfaces'
import { useState } from 'react'
import CommentItem from './comment-item'

export interface ICommentItemsListProps {
    data: Rating[]
}

export default function CommentItemsList(props: ICommentItemsListProps) {
    const [commentList, setCommentList] = useState(props.data)

    const updateCommentList = () => {
        const newList = [...commentList, ...props.data]
        setCommentList(newList)
    }

    if (!commentList) {
        return <></>
    }

    return (
        <div>
            {commentList.map((item, index) => {
                return (
                    <div className="space-y-6" key={index}>
                        <CommentItem data={item} />
                        {index !== commentList.length - 1 && <Divider />}
                    </div>
                )
            })}
            <Button
                className="btn-primary-outline w-full mt-5"
                onClick={() => updateCommentList()}
            >
                <div className="font-medium text-[16px] text-center w-full">
                    Show more comments
                </div>
            </Button>
        </div>
    )
}
