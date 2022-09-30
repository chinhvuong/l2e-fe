import React from 'react'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

type BreadcrumbItem = {
    text: string
    href: string
}
type Props = {
    data: BreadcrumbItem[]
}

function Breadcrumb({ data }: Props) {
    return (
        <div className="breadcrumb flex items-center gap-4">
            {data.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                    {index > 0 && (
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="text-hyperlink-light"
                        />
                    )}
                    <Link href={item.href} passHref>
                        <span
                            className={`leading-6 cursor-pointer text-hyperlink-light font-semibold`}
                            key={index}
                        >
                            {item.text}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Breadcrumb
