import { useEffect, useState } from 'react'
import { getDescription } from '@/store/course/selectors'
import ShowMore from '@/components/core/show-more'
import { useAppSelector } from '@/hooks'

export interface IDescriptionProps {}

export default function Description() {
    const data = useAppSelector(getDescription)

    const [showMore, setShowMore] = useState(false)

    const convertStringToHTML = () => {
        const element = document.getElementById('description-content')
        let displayedData = data.replaceAll(
            '<li>',
            '<li class="list-disc list-inside ml-2">',
        )
        displayedData = displayedData.replaceAll(
            '<ul>',
            '<ul class="space-y-3">',
        )
        if (element) {
            element.innerHTML = displayedData
        }
    }

    useEffect(() => {
        convertStringToHTML()
        setShowMore(true)
    }, [])

    return (
        <div id="description" className="space-y-3 overflow-hidden relative">
            <div className="font-semibold text-[26px]">Description</div>
            <div
                className="text-justify space-y-3"
                id="description-content"
            ></div>
            {showMore && <ShowMore el="description" elHeightPreview={400} />}
        </div>
    )
}
