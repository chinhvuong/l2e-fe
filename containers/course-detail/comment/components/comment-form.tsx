import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import '@/components/core/modal/style.scss'

export interface ICommentFormProps {
    handleSubmit: (content: string) => void
    // hasCancelButton: boolean
    // handleCancel?: MouseEventHandler<HTMLButtonElement> | undefined
    initialText?: string
}

const CommentForm = ({
    handleSubmit,
    // hasCancelButton = false,
    // handleCancel,
    initialText = '',
}: ICommentFormProps) => {
    const [text, setText] = useState(initialText)
    const isTextareaDisabled = text.length === 0
    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        handleSubmit(text)
        setText('')
    }
    return (
        <form onSubmit={onSubmit} className="flex w-full space-x-5">
            <textarea
                id="textarea"
                className="w-full h-20 border rounded-lg px-4 py-3 border-black overflow-y-auto scrollbar resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write comment..."
            />
            <button disabled={isTextareaDisabled} className="cursor-pointer">
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="bg-primary hover:bg-primary-hover p-3 rounded-full text-white text-sm"
                />
            </button>
            {/* {hasCancelButton && (
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            )} */}
        </form>
    )
}

export default CommentForm
