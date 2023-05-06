import * as React from 'react'

export interface ICompanyProps {}

export default function Company() {
    return (
        <div className="border border-border-box w-full py-6 px-9">
            <span className="font-semibold">
                Top companies offer this course to their employees
            </span>
            <div className="text-[14px] mt-1 mb-5 text-description">
                This course was selected for our collection of top-rated courses
                trusted by businesses worldwide.{' '}
                <span className="text-hyperlink underline underline-offset-4 decoration-hyperlink cursor-pointer">
                    Learn more
                </span>
            </div>
            <div className="flex justify-around">
                <img src="/svgs/logos/nasdaq.svg" alt="" />
                <img src="/svgs/logos/volkswagen.svg" alt="" />
                <img src="/svgs/logos/box.svg" alt="" />
                <img src="/svgs/logos/netapp.svg" alt="" />
                <img src="/svgs/logos/eventbrite.svg" alt="" />
            </div>
        </div>
    )
}
