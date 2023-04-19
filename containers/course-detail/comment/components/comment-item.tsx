import { Rating } from '@/constants/interfaces'

export interface ICommentItemProps {
    data: Rating
}

export default function CommentItem(props: ICommentItemProps) {
    const getTimeAgo = () => {
        const yearAgo =
            new Date().getFullYear() - props.data.updatedAt.getFullYear()
        const monthAgo = new Date().getMonth() - props.data.updatedAt.getMonth()
        const dayAgo = new Date().getDate() - props.data.updatedAt.getDate()
        const hourAgo = new Date().getHours() - props.data.updatedAt.getHours()

        if (yearAgo > 1) {
            return `${yearAgo} years ago`
        } else if (yearAgo === 1) {
            return `1 year ago`
        } else if (monthAgo > 1) {
            return `${monthAgo} months ago`
        } else if (monthAgo === 1) {
            return `1 month ago`
        } else if (dayAgo > 1) {
            return `${dayAgo} day ago`
        } else if (dayAgo === 1) {
            return 'yesterday'
        } else if (hourAgo > 1) {
            return `${hourAgo} hours ago`
        } else if (hourAgo === 1) {
            return `1 hour ago`
        } else {
            return 'recently'
        }
    }

    return (
        <div>
            <div className="flex items-center my-4 space-x-5 sm:space-x-0">
                <img
                    src="/images/avatar.jpg"
                    alt=""
                    className="rounded-[50%] w-[60px] sm:hidden"
                />
                <div className="space-y-2">
                    <div className="font-bold mt-1">{props.data.user}</div>
                    <div className="text-description">{getTimeAgo()}</div>
                </div>
            </div>
            <div className="space-y-3 relative ml-[80px] sm:ml-0">
                <div className="text-justify">{props.data.comment}</div>
                <button className="text-black hover:text-primary">
                    <div className="font-semibold text-center text-sm mt-3">
                        Reply
                    </div>
                </button>
            </div>
        </div>
    )
}
