import React, {
    HTMLAttributes,
    ReactNode,
    ReactText,
    useEffect,
    useRef,
} from 'react'
import './style.scss'
import CloseIcon from '@/public/svgs/close-icon.svg'

type Props = {
    openDefault?: boolean
    id: string
    metaClass?: string
    children: ReactNode | ReactText
    closeIcon?: boolean
    closeWhenClickOutside?: boolean
}

export const openModal = (id: string) => {
    const modal = document.getElementById(`modal-${id}`)
    console.log('🚀 ~ file: index.tsx ~ line 16 ~ openModal ~ modal', modal)
    if (modal) {
        modal.classList.remove('!hidden')
        document.body.classList.add('overflow-hidden')
        setTimeout(() => {
            modal.querySelector('.modal-body')?.classList.add('open')
        }, 0)
    }
}

export const closeModal = (id: string) => {
    const modal = document.getElementById(`modal-${id}`)
    if (modal) {
        modal.querySelector('.modal-body')?.classList.remove('open')
        modal.classList.add('opacity-0')
        document.body.classList.remove('overflow-hidden')
        setTimeout(() => {
            modal.classList.add('!hidden')
            modal.classList.remove('opacity-0')
        }, 250)
    } else {
        alert('Alo')
    }
}

export const toggleModal = (id: string) => {
    const modal = document.getElementById(`modal-${id}`)
    if (modal) {
        if (modal.classList.contains('!hidden')) {
            openModal(id)
        } else {
            closeModal(id)
        }
    }
}

function Modal({
    openDefault,
    id,
    children,
    closeIcon,
    closeWhenClickOutside,
    ...rest
}: Props & HTMLAttributes<HTMLDivElement>) {
    const modalBody = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (openDefault) {
            openModal(id)
        }
    }, [openDefault])

    const clickOutSide = (e: any) => {
        if (closeWhenClickOutside) {
            if (
                modalBody &&
                modalBody.current &&
                !modalBody.current.contains(e.target)
            ) {
                closeModal(id)
            }
        }
    }

    return (
        <div
            onClick={clickOutSide}
            id={`modal-${id}`}
            className="modal bg-black/80 flex-x-center h-[100vh] w-[100vw] fixed top-0 left-0 !hidden z-10 transition-opacity"
        >
            <div
                ref={modalBody}
                className={`modal-body absolute top-1/2 bg-white w-2/5 sm:w-[calc(100vw-2rem)] p-4 rounded-md shadow-lg scrollbar ${rest.className}`}
            >
                {closeIcon && (
                    <div
                        className="absolute top-2 right-0 close-icon"
                        onClick={() => closeModal(id)}
                    >
                        <CloseIcon />
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}

export default Modal
