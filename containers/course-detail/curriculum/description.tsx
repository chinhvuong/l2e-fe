import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getDescription } from '@/store/course/selectors'
import ShowMore from '@/components/core/show-more'

export interface IDescriptionProps {}

export default function Description() {
    const data = useSelector(getDescription)
    const [elHeight, setElHeight] = useState('')

    return (
        <div
            id="description"
            className={`space-y-3 overflow-hidden relative ${elHeight}`}
        >
            <div className="font-semibold text-[26px]">Description</div>
            <div className="text-justify">{data}</div>
            <ShowMore
                el="requirement"
                elHeightPreview={400}
                changeElHeight={setElHeight}
            />
        </div>
    )
}
