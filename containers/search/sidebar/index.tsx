export interface IMyCoursesLayoutProps {}
export interface ISidebarProps {
    onRadioBoxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    sortType: string
}

export default function Sidebar(props: ISidebarProps) {
    const rating = ['Most Rated', 'Most Enrolled', 'Lowest Price']
    return (
        <div className="space-y-10 flex flex-col justify-start w-[300px] pt-7">
            <div className="space-y-2 flex flex-col">
                <hr className="bg-black border-[1px]"></hr>
                <div className="font-semibold text-[20px] ml-5">Sort By</div>
                {rating.map((item, index) => {
                    return (
                        <div
                            className={`text-black cursor-pointer rounded-r-full py-3 px-5 flex`}
                            key={index}
                        >
                            <input
                                className={`mr-2 flex`}
                                type="radio"
                                value={item}
                                checked={props.sortType === item}
                                onChange={props.onRadioBoxChange}
                            />
                            <div className={`flex items-center space-x-2`}>
                                {' '}
                                {item}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
