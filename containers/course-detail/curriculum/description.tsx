import { useEffect, useState } from 'react'
import { getDescription } from '@/store/course/selectors'
import ShowMore from '@/components/core/show-more'
import { useAppSelector } from '@/hooks'
import parse from 'html-react-parser'

export interface IDescriptionProps {}

export default function Description() {
    const data = useAppSelector(getDescription)

    const [showMore, setShowMore] = useState(false)

    const getUIContent = () => {
        let formattedData = data.replaceAll(
            '<li>',
            '<li class="list-disc list-inside ml-2">',
        )
        formattedData = formattedData.replaceAll(
            '<ul>',
            '<ul class="space-y-3">',
        )
        console.log('convertStringToHTML', formattedData)

        return (
            <div className="text-justify space-y-3" id="description-content">
                {parse(formattedData)}
            </div>
        )
    }

    useEffect(() => {
        setShowMore(true)
    }, [data])

    return (
        <>
            {data !== '' && (
                <div
                    id="description"
                    className="space-y-3 overflow-hidden relative"
                >
                    <div className="font-semibold text-[26px]">Description</div>
                    {data && getUIContent()}
                    {showMore && (
                        <ShowMore el="description" elHeightPreview={400} />
                    )}
                </div>
            )}
        </>
    )
}
