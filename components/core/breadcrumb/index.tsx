import React from 'react'
import ArrowUp from '@/public/svgs/arrow-up.svg'
import Link from 'next/link'

type BreadscrumbItem = {
    text: string
    href: string
    active?: boolean
}
type Props = {
    data: BreadscrumbItem[]
}

function Breadcrumb({ data }: Props) {
    return (
        <div className="breadcrumb flex items-center gap-4">
            {data.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                    {index % 2 === 1 && (
                        <ArrowUp className="rotate-90 scale-75" />
                    )}
                    <Link href={item.href} passHref>
                        <span
                            className={`leading-6 font-normal cursor-pointer ${
                                item.active && 'font-medium'
                            } `}
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
