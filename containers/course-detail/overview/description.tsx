import parse from 'html-react-parser'
import { useCourseDetailContext } from '../course-detail-context'

export interface IDescriptionProps {}

export default function Description() {
    const { data } = useCourseDetailContext()
    const description = data?.description

    const getUIContent = () => {
        if (description) {
            let formattedData = description.replace(
                /'<li>'/g,
                '<li class="list-disc list-inside ml-2">',
            )
            formattedData = formattedData.replace(
                /'<ul>'/g,
                '<ul class="space-y-3">',
            )

            return (
                <div
                    className="text-justify space-y-3"
                    id="description-content"
                >
                    {parse(formattedData)}
                </div>
            )
        }
    }

    return (
        <>
            {description && (
                <div
                    id="description"
                    className="space-y-3 overflow-hidden relative"
                >
                    <div className="font-semibold text-[26px]">Description</div>
                    {description && getUIContent()}
                </div>
            )}
        </>
    )
}
