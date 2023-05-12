import { convertToHTML } from 'draft-convert'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './style.scss'
const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false },
)

export interface IRichTextEditorProps {
    label?: string
    updateState: Function
    defaultValue?: string
    updateTextLength?: Function
}

export default function RichTextEditor({
    label,
    updateState,
    defaultValue,
    updateTextLength,
}: IRichTextEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>()

    useEffect(() => {
        setEditorState(
            EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(defaultValue ?? '').contentBlocks,
                ),
            ),
        )
    }, [])

    if (!editorState) {
        return <></>
    }

    return (
        <div>
            {label && (
                <div className="font-bold pb-2 pl-[25px] sm:text-xs sm:mt-2">
                    {label}
                </div>
            )}
            <Editor
                editorState={editorState}
                wrapperClassName="border border-black rounded-[20px]"
                editorClassName="mx-[25px]"
                toolbarClassName="toolbar"
                onEditorStateChange={(newState) => {
                    updateState(convertToHTML(editorState.getCurrentContent()))
                    updateTextLength &&
                        updateTextLength(
                            editorState
                                .getCurrentContent()
                                .getPlainText()
                                .split(/(\s+)/)
                                .filter((e) => e.trim().length > 0).length,
                        )
                    setEditorState(newState)
                }}
                toolbar={{
                    options: ['blockType', 'inline', 'list', 'link'],
                    inline: {
                        options: ['bold', 'italic'],
                    },
                    blockType: {
                        inDropdown: true,
                        options: [
                            'Normal',
                            'H1',
                            'H2',
                            'H3',
                            'H4',
                            'H5',
                            'H6',
                            'Blockquote',
                            'Code',
                        ],
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                    },
                    link: {
                        inDropdown: false,
                        showOpenOptionOnHover: true,
                        options: ['link'],
                    },
                }}
                placeholder="Insert your course description."
                handlePastedText={() => false}
            />
        </div>
    )
}
