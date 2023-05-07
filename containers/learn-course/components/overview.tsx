import Divider from '@/components/core/divider'
import { faCheck, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import parse from 'html-react-parser'
import { useLearningCourseContext } from '../learning-course-context'

export interface ILearningOverviewDetailProps {}

export default function LearningOverviewDetail() {
    const { courseDetail } = useLearningCourseContext()

    const getUIContent = (content: string) => {
        let formattedData = content.replace(
            /'<li>'/g,
            '<li class="list-disc list-inside ml-2">',
        )
        formattedData = formattedData.replace(
            /'<ul>'/g,
            '<ul class="space-y-3">',
        )

        return (
            <div className="text-justify space-y-3">{parse(formattedData)}</div>
        )
    }

    if (!courseDetail) {
        return <></>
    }

    return (
        <div id="overview" className="space-y-3 overflow-hidden relative">
            <div>
                <div className="text-2xl font-bold">About this course</div>
                <div className="grid grid-cols-12 py-3">
                    <div className="col-span-8">{courseDetail.overview}</div>
                </div>
            </div>
            <Divider className="my-5" />
            <div className="grid grid-cols-12">
                <div className="col-span-3">What you’ll learn</div>
                <div className="col-span-8">
                    {courseDetail.goals.map((item: string, index: number) => {
                        return (
                            <div
                                className="flex items-start space-x-3 mb-2"
                                key={index}
                            >
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="mt-1"
                                />
                                <div className={`text-justify`}>{item}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Divider className="my-5" />
            <div className="grid grid-cols-12">
                <div className="col-span-3">Requirement</div>
                <div className="col-span-8 space-y-2">
                    {courseDetail.requirements.map(
                        (item: string, index: number) => {
                            return (
                                <div className="flex items-start" key={index}>
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className="text-[8px] pr-5 pt-2"
                                    />
                                    <div>{item}</div>
                                </div>
                            )
                        },
                    )}
                </div>
            </div>
            <Divider className="my-5" />
            <div className="grid grid-cols-12">
                <div className="col-span-3">Description</div>
                <div className="col-span-8">
                    {getUIContent(courseDetail.description)}
                </div>
            </div>
        </div>
    )
}
