import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'

export default function LearnerPerformanceContainer() {
    useHideFirstEnterLoadingScreen()

    return (
        <>
            <div className="h-full mt-9">
                <div className="flex justify-between px-14">
                    <div className="font-semibold text-[30px]">Performance</div>
                </div>
            </div>
        </>
    )
}
