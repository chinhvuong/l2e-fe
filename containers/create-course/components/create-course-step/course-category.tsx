import Select from '@/components/core/select'

export interface ICourseCategoryProps {
    selected: string
    categoryItemList: string[]
    setCategory: Function
    isLoading: boolean
}

export default function CourseCategory({
    selected,
    categoryItemList,
    setCategory,
    isLoading,
}: ICourseCategoryProps) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-3xl mt-16 mb-6 font-bold">{`How about a course title?`}</div>
            <div className="mb-12">{`It's ok if you can't think of a good title now. You can change it later.`}</div>
            <div className="w-[700px]">
                <Select
                    selectList={categoryItemList}
                    placeholder="Select category"
                    setSelected={setCategory}
                    isLoading={isLoading}
                    selected={selected}
                />
            </div>
        </div>
    )
}
