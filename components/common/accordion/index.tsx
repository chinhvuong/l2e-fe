import React, { useRef, useEffect } from 'react'
import './style.scss'
import ArrowUp from '@/public/svgs/arrow-up.svg'
import Router from 'next/router'
import { handleGoPage } from '@/utils/helpers'
interface IAccordion {
    openDefault?: boolean
    leftEl: JSX.Element
    rightEl: JSX.Element
    classes?: string
    bodyClass?: string
    children: any
    href?: string
}

const Accordion = (props: IAccordion) => {
    const {
        leftEl,
        rightEl,
        href,
        children,
        classes,
        openDefault = false,
        bodyClass,
    } = props
    const accordionRef = useRef<HTMLDivElement>(null)

    const classOpen = 'accordion__open'
    const toggleOpen = () => {
        if (href) {
            Router.push(href)
            handleGoPage()
        }
        setMaxHeight()
        accordionRef.current?.classList.toggle(classOpen)
    }
    const setMaxHeight = () => {
        const div = accordionRef.current?.querySelector(
            '.accordion_body',
        ) as HTMLDivElement
        if (div) {
            const h = accordionRef.current?.classList.contains(classOpen)
                ? 0
                : div?.scrollHeight
            div?.style.setProperty('--max-height', h + 'px')
        }
    }

    useEffect(() => {
        if (openDefault) toggleOpen()
        setMaxHeight()
    }, [])

    useEffect(() => {
        setMaxHeight()
    }, [children])

    return (
        <div
            ref={accordionRef}
            className={`accordion rounded-lg ${classes || ''}`}
        >
            <div
                className={`accordion__title cursor-pointer flex gap-4 justify-between py-2 rounded-lg`}
                onClick={toggleOpen}
            >
                <div className="flex justify-between gap-4">
                    <div>{leftEl}</div>
                </div>
                {children && (
                    <div className="flex">
                        <div>{rightEl}</div>
                        <ArrowUp className="accordion-arrow" />
                    </div>
                )}
            </div>
            <div className={`accordion_body ${bodyClass} !py-0`}>
                {children}
            </div>
        </div>
    )
}

export default Accordion
