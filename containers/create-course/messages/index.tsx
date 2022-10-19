import RichTextEditor from '@/components/core/rich-text-editor'
import * as React from 'react'
import Title from '../components/title'

export interface IMessagesContainerProps {}

export default function MessagesContainer() {
    return (
        <div>
            <Title title={'Course messages'} />
            <div className="py-10 px-14 space-y-5">
                <div>{`Write messages to your students (optional) that will be sent automatically when they join or complete your course to encourage students to engage with course content. If you do not wish to send a welcome or congratulations message, leave the text box blank.`}</div>
                <RichTextEditor label="Welcome Message" />
                <RichTextEditor label="Congratulations Message" />
            </div>
        </div>
    )
}
