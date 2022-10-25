import { EditorState } from 'draft-js'
import { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false },
)
import './style.scss'

export interface IRichTextEditorProps {
    label: string
}

// bug ở phần placeholder, click order/unorder list đầu tiên

export default function RichTextEditor(props: IRichTextEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty(),
    )

    return (
        <div>
            <div className="font-bold pb-2 pl-3 sm:text-xs sm:mt-2">
                {props.label}
            </div>
            <Editor
                editorState={editorState}
                wrapperClassName="border border-black rounded-[20px]"
                editorClassName="ml-[20px]"
                toolbarClassName="toolbar"
                onEditorStateChange={(newState) => {
                    setEditorState(newState)
                }}
                toolbar={{
                    options: ['inline', 'list'],
                    inline: {
                        options: ['bold', 'italic'],
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                    },
                }}
                placeholder="Insert your course description."
            />
        </div>
    )
}
