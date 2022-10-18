import * as React from 'react'
import { getDescription } from '@/store/course/selectors'
import ShowMore from '@/components/core/show-more'
import { useAppSelector } from '@/hooks'

export interface IDescriptionProps {}

export default function Description() {
    const data = useAppSelector(getDescription)

    return (
        <div id="description" className="space-y-3 overflow-hidden relative">
            <div className="font-semibold text-[26px]">Description</div>
            <div className="text-justify">{data}</div>
            <ShowMore el="description" elHeightPreview={400} />
        </div>
    )
}
