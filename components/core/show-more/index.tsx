import { useState, useEffect } from 'react'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IShowMoreProps {
    el: string
    elHeightPreview: number
    changeElHeight: Function
    setShowFullContent?: Function
}

export default function ShowMore(props: IShowMoreProps) {
    const [elHeight, setElHeight] = useState(0)
    const [showFullContent, setShowFullContent] = useState(false)

    useEffect(() => {
        const height = document.getElementById(props.el)?.scrollHeight ?? 0
        if (height > props.elHeightPreview) {
            changeElHeight(height)
        }
        height > props.elHeightPreview
            ? changeElHeight(props.elHeightPreview)
            : changeElHeight(height)
        setElHeight(height)
    }, [])

    const changeElHeight = (height: number) => {
        if (height > props.elHeightPreview && showFullContent) {
            props.changeElHeight('h-[' + props.elHeightPreview + 'px]')
        } else {
            props.changeElHeight('h-[' + height + 'px]')
        }
    }

    const handleShowMore = () => {
        changeElHeight(elHeight)
        setShowFullContent(!showFullContent)
        props.setShowFullContent && setShowFullContent(!showFullContent)
    }

    return (
        <div
            className={`flex flex-col justify-end z-10 top-1 left-0 w-full h-full ${
                elHeight <= props.elHeightPreview && 'hidden'
            } ${!showFullContent && 'absolute'} `}
        >
            <div
                className={`h-full ${
                    !showFullContent &&
                    'bg-gradient-to-b from-transparent to-white'
                }`}
            ></div>
            <div
                className={`cursor-pointer ${
                    !showFullContent && 'pb-5 bg-white'
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
