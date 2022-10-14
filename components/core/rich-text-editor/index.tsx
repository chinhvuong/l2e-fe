import { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

export interface IRichTextEditorProps {}

export default function RichTextEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onChange = (editorState: any) => {
        setEditorState(editorState)
    }

    const handleKeyCommand = (command: any) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    const onUnderlineClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
    }

    const onBoldClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }

    const onItalicClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
    }

    return (
        <div className="editorContainer">
            <button onClick={onUnderlineClick}>U</button>
            <button onClick={onBoldClick}>
                <b>B</b>
            </button>
            <button onClick={onItalicClick}>
                <em>I</em>
            </button>
            <div className="editors">
                <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}
