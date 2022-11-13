import * as React from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import Button from '@/components/core/button'

export interface IHeaderProps {}

export default function Header() {
    const goBack = () => {
        Router.back()
    }

    return (
        <div
            className="flex items-center justify-between bg-black h-[65px] w-full fixed top-0 z-10 cursor-pointer px-5"
            onClick={() => goBack()}
        >
            <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="text-xl bg-black text-white"
                />
                <div className="text-white">Back</div>
            </div>
            <Button>
                <div className="font-semibold">Save</div>
            </Button>
        </div>
    )
}
