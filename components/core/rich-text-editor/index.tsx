import { useAppDispatch } from '@/hooks'
import { updateDescriptionLength } from '@/store/course'
import { convertToHTML } from 'draft-convert'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import { useState } from 'react'
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
}

export default function RichTextEditor(props: IRichTextEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML(props.defaultValue ?? '').contentBlocks,
            ),
        ),
    )
    const dispatch = useAppDispatch()

    return (
        <div>
            {props.label && (
                <div className="font-bold pb-2 pl-[25px] sm:text-xs sm:mt-2">
                    {props.label}
                </div>
            )}
            <Editor
                editorState={editorState}
                wrapperClassName="border border-black rounded-[20px]"
                editorClassName="mx-[25px]"
                toolbarClassName="toolbar"
                onEditorStateChange={(newState) => {
                    props.updateState(
                        convertToHTML(editorState.getCurrentContent()),
                    )
                    dispatch(
                        updateDescriptionLength(
                            editorState
                                .getCurrentContent()
                                .getPlainText()
                                .split(/(\s+)/)
                                .filter((e) => e.trim().length > 0).length,
                        ),
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
