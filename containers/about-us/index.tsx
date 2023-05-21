import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AboutUsContainer() {
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
            <div>
                <div className="flex justify-center text-2xl font-semibold mt-10">
                    About us
                </div>
                <div className="flex justify-center mt-2 mb-5">
                    <Divider className="w-20" />
                </div>
                <div className="flex justify-center text-lg">
                    <div className="w-[55%] text-center">
                        This is a non-profit team-based graduation project about
                        education. The website provides educational courses with
                        certificates saved on Blockchain.
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-center text-2xl font-semibold mt-10">
                    Meet the team
                </div>
                <div className="flex justify-center mt-2 mb-10">
                    <Divider className="w-20" />
                </div>
                <div className="grid grid-cols-3">
                    <div className="flex justify-end">
                        <div className="flex flex-col items-center">
                            <img
                                src="/images/chinh_vuong.jpg"
                                alt="chinh_vuong"
                                className="w-40 h-40 rounded-full"
                            />
                            <div className="mt-5 mb-1 font-semibold">
                                Vương Văn Chính
                            </div>
                            <div className="text-sm text-description">
                                Team Lead, Full-stack Developer
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src="/images/huu_an.jpg"
                            alt="huu_an"
                            className="w-40 h-40 rounded-full"
                        />
                        <div className="mt-5 mb-1 font-semibold">
                            Nguyễn Hữu An
                        </div>
                        <div className="text-sm text-description">
                            Front-end Developer
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="flex flex-col items-center">
                            <img
                                src="/images/viet_hoa.jpg"
                                alt="viet_hoa"
                                className="w-40 h-40 rounded-full"
                            />
                            <div className="mt-5 mb-1 font-semibold">
                                Nguyễn Việt Hòa
                            </div>
                            <div className="text-sm text-description">
                                Front-end, Web3 Developer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
