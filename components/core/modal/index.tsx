import * as React from 'react'
import ReactModal from 'react-modal'
import Button from '../button'

export interface IModalProps {
    modalIsOpen: boolean
    setModalIsOpen: Function
}

export default function Modal({ modalIsOpen, setModalIsOpen }: IModalProps) {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }
    return (
        <ReactModal isOpen={modalIsOpen} style={customStyles}>
            <h2>Hello</h2>
            <div>I am a modal</div>
            <div className="flex space-x-3 justify-end items-center">
                <Button>
                    <div>Save</div>
                </Button>
                <Button
                    className="btn-primary-outline"
                    onClick={() => setModalIsOpen(!modalIsOpen)}
                >
                    <div>Cancel</div>
                </Button>
            </div>
        </ReactModal>
    )
}
