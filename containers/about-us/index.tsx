import Button from '@/components/core/button'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AboutUsContainer() {
    useHideFirstEnterLoadingScreen()

    return (
        <div>
            <div className="bg-second h-[550px] flex justify-center items-center text-white space-x-10 px-14">
                <div className="w-[540px] space-y-7">
                    <div className="leading-snug font-bold text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-3xl">
                        <div>
                            We share{' '}
                            <span className="text-primary">knowledge</span>
                        </div>
                        <div>with the world</div>
                    </div>
                    <div className="lg:text-sm md:text-xs">
                        Whether you want to learn or to share what you know,
                        you’ve come to the right place. As a global destination
                        for online learning, we connect people through
                        knowledge.
                    </div>
                    <div className="flex items-center space-x-[30px] under_xl:flex-col under_xl:space-x-[0px] under_xl:space-y-[20px] lg:text-sm md:text-xs">
                        <Button className="btn-primary">Join us now</Button>
                        <div className="flex items-center space-x-[20px] cursor-pointer">
                            <FontAwesomeIcon
                                icon={faPlay}
                                className="text-[#23BDEE] rounded-full bg-white py-[16px] px-[18px]"
                            />
                            <div className="hover:text-primary-hover">
                                Watch how it works
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src="/svgs/aboutUs.svg"
                    alt=""
                    className="max-w-full max-h-full xl:w-[450px] lg:w-[370px] md:w-[300px] sm:hidden"
                />
            </div>
            <img src="/svgs/curvedPart.svg" alt="" className="w-full" />
        </div>
    )
}
