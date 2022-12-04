import { useState, useEffect } from 'react'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IShowMoreProps {
    el: string
    elHeightPreview: number
    setShowFullContent?: Function
}

export default function ShowMore(props: IShowMoreProps) {
    const [show, setShow] = useState(false)
    const [showFullContent, setShowFullContent] = useState(false)

    useEffect(() => {
        const height = document.getElementById(props.el)?.scrollHeight ?? 0
        setShow(height > props.elHeightPreview)
        changeElHeight(height)
    }, [showFullContent])

    const changeElHeight = (height: number) => {
        if (height > props.elHeightPreview) {
            if (showFullContent) {
                document
                    .getElementById(props.el)
                    ?.setAttribute('style', `height: ${height}px`)
            } else {
                document
                    .getElementById(props.el)
                    ?.setAttribute(
                        'style',
                        `height: ${props.elHeightPreview}px`,
                    )
            }
        } else {
            document
                .getElementById(props.el)
                ?.setAttribute('style', `height: ${height}px`)
        }
    }

    const handleShowMore = () => {
        setShowFullContent(!showFullContent)
        props.setShowFullContent && props.setShowFullContent(!showFullContent)
    }

    return (
        <div
            className={`${
                !showFullContent
                    ? 'flex flex-col justify-end absolute z-10 top-1 left-0 w-full h-full'
                    : ''
            } ${!show ? 'hidden' : ''}`}
        >
            <div
                className={`h-full ${
                    !showFullContent &&
                    'bg-gradient-to-b from-transparent to-white'
                }`}
            ></div>
            <div
                className={`cursor-pointer ${
                    !showFullContent ? 'pb-5 bg-white' : ''
                }`}
                onClick={() => handleShowMore()}
            >
                <span className="text-hyperlink font-bold mr-2">
                    Show {!showFullContent ? 'more' : 'less'}
                </span>
                <FontAwesomeIcon
                    icon={!showFullContent ? faChevronDown : faChevronUp}
                    className="text-hyperlink"
                />
            </div>
        </div>
    )
}
