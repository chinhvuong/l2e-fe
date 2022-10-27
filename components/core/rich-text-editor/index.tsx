import { EditorState } from 'draft-js'
import { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false },
)
import './style.scss'
import { resolve } from 'dns'

export interface IRichTextEditorProps {
    label: string
}

// bug ở phần placeholder, click order/unorder list đầu tiên

export default function RichTextEditor(props: IRichTextEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty(),
    )
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

    // const handleUploadFile = () => {
    //     const inputFile = document.createElement('input')
    //     inputFile.type = 'file'
    //     inputFile.accept = 'image/*'

    //     inputFile.click()

    //     inputFile.onchange = (e) => {
    //         const target = e.target as HTMLInputElement
    //         if (target.files && target.files[0]) {
    //             setUploadedFiles([...uploadedFiles, target.files[0]])
    //             // const formData = new FormData()
    //             // formData.append('file', target.files[0])

    //             // uploadFile(formData)
    //         }
    //     }
    // }

    const handleUploadFile = (file: File) => {
        return new Promise(async (resolve: any) => {
            setUploadedFiles([...uploadedFiles, file])
            const objectUrl = URL.createObjectURL(file)
            resolve({
                data: {
                    link: objectUrl,
                },
            })
        })
    }

    return (
        <div>
            <div className="font-bold pb-2 pl-3 sm:text-xs sm:mt-2">
                {props.label}
            </div>
            <Editor
                editorState={editorState}
                wrapperClassName="border border-black rounded-[20px]"
                editorClassName="mx-[20px]"
                toolbarClassName="toolbar"
                onEditorStateChange={(newState) => {
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
