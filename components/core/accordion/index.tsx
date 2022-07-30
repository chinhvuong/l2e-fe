import React, { useRef, useEffect, ReactElement, ReactNode } from 'react'
import './style.scss'
import ArrowUp from '@/public/svgs/arrow-up.svg'
import Router from 'next/router'
import { handleGoPage } from '@/utils/helpers'
interface IAccordion {
    openDefault?: boolean
    title: string
    classes?: string
    titleClass?: string
    bodyClass?: string
    children: any
    href?: string
    icon?: string | ReactElement | ReactNode
}

const Accordion = (props: IAccordion) => {
    const {
        title,
        href,
        children,
        classes,
        openDefault = false,
        titleClass,
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
    // const setOpen = (value: boolean) => {
    //     value
    //         ? accordionRef.current?.classList.add(classOpen)
    //         : accordionRef.current?.classList.remove(classOpen)
    // }

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
            className={`${classes || ''} accordion rounded-lg`}
        >
            <div
                className={`accordion__title cursor-pointer flex gap-4 items-center justify-between px-4 py-2 rounded-lg ${titleClass} `}
                onClick={toggleOpen}
            >
                <div className="flex items-center gap-4">
                    {props.icon && props.icon} <span>{title}</span>
                </div>
                {children && <ArrowUp className="accordion-arrow" />}
            </div>
            <div className={`accordion_body px-4 ${bodyClass} !py-0`}>
                {children}
            </div>
        </div>
    )
}

export default Accordion
