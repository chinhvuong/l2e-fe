import {
    ViewCourseDetailTabTitle,
    useCourseDetailContext,
} from '../course-detail-context'

export interface INavBarProps {}

export default function NavBar() {
    const { currentTab, setCurrentTab } = useCourseDetailContext()
    const menu = [
        ViewCourseDetailTabTitle.OVERVIEW,
        ViewCourseDetailTabTitle.CURRICULUM,
        ViewCourseDetailTabTitle.INSTRUCTOR,
        ViewCourseDetailTabTitle.REVIEWS,
    ]

    return (
        <div className="2xl:flex 2xl:justify-center w-full bg-white drop-shadow-lg">
            <div className="2xl:flex 2xl:w-[1250px] 2xl:justify-between">
                <div className="flex justify-around 2xl:w-[820px] mx-8">
                    {menu.map((item, index) => {
                        return (
                            <div
                                className={`font-bold cursor-pointer py-3 under_lg:text-xs ${
                                    currentTab === item
                                        ? 'border-b-2 border-hyperlink text-hyperlink'
                                        : 'text-description'
                                }`}
                                key={index}
                                onClick={() => setCurrentTab(item)}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>
                <div className="w-[0px] 2xl:w-[320px]"></div>
            </div>
        </div>
    )
}
