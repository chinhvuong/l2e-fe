import { EditorState } from 'draft-js'
import { useEffect, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false },
)
import './style.scss'
import { convertToHTML } from 'draft-convert'

export interface IRichTextEditorProps {
    label?: string
    updateState: Function
}

// bug ở phần placeholder, click order/unorder list đầu tiên

export default function RichTextEditor(props: IRichTextEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty(),
    )
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [uploadedFilesURLs, setUploadedFilesURLs] = useState<string[]>([])

    const handleUploadFile = (file: File) => {
        return new Promise(async (resolve: any) => {
            setUploadedFiles([...uploadedFiles, file])
            const objectUrl = URL.createObjectURL(file)
            setUploadedFilesURLs([...uploadedFilesURLs, objectUrl])
            resolve({
                data: {
                    link: objectUrl,
                },
            })
        })
    }

    const freeMemory = () => {
        uploadedFilesURLs.map((item) => URL.revokeObjectURL(item))
    }

    useEffect(() => {
        // free memory when ever this component is unmounted
        return () => freeMemory()
    }, [])

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
                    setEditorState(newState)
                }}
                toolbar={{
                    options: ['blockType', 'inline', 'list', 'link', 'image'],
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
                    image: {
                        uploadCallback: handleUploadFile,
                        urlEnabled: true,
                        uploadEnabled: true,
                        previewImage: true,
                        alt: { present: false, mandatory: false },
                    },
                }}
                placeholder="Insert your course description."
            />
        </div>
    )
}
