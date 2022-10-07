import * as React from 'react'
import Instructor from './instructor'

export interface IInstructorListProps {}

export default function InstructorList() {
    return (
        <div className="flex justify-center">
            <div className="2xl:w-[1250px]">
                <div className="w-[820px] ml-[10px] space-y-5 mt-5">
                    <div className="font-semibold text-[26px]">Instructor</div>
                    <Instructor data={1} />
                    <Instructor data={2} />
                </div>
            </div>
        </div>
    )
}
