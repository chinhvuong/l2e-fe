import { UseMutateFunction } from '@tanstack/react-query'
import { MouseEventHandler, useState } from 'react'

export interface ICommentFormProps {
    handleSubmit: (content: string) => void
    submitLabel: string
    hasCancelButton: boolean
    handleCancel?: MouseEventHandler<HTMLButtonElement> | undefined
    initialText?: string
}

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
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
        <form onSubmit={onSubmit} className="flex w-full">
            <textarea
                className="w-full border-[1px] border-black"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className="comment-form-button"
                disabled={isTextareaDisabled}
            >
                {submitLabel}
            </button>
            {hasCancelButton && (
                <button
                    type="button"
                    className="comment-form-button comment-form-cancel-button"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            )}
        </form>
    )
}

export default CommentForm
