import * as React from 'react'
import Instructor from './instructor'

export interface IInstructorListProps {}

export default function InstructorList() {
    return (
        <div className="w-[820px] ml-[110px] space-y-5 mt-5">
            <div className="font-semibold text-[26px]">Instructor</div>
            <Instructor data={1} />
            <Instructor data={2} />
        </div>
    )
}
