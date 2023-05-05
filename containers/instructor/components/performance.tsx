import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'

export default function InstructorPerformanceContainer() {
    useHideFirstEnterLoadingScreen()

    return (
        <>
            <div className="h-full mt-9 px-[4.5rem]">
                <div className="flex justify-between">
                    <div className="font-semibold text-[30px]">Performance</div>
                </div>
            </div>
        </>
    )
}
