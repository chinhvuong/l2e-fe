import { useState, useEffect } from 'react'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlay,
    faShareNodes,
    faTv,
    faFile,
    faCloudArrowDown,
    faCode,
    faInfinity,
    faMobileScreenButton,
    faClipboardList,
    faAward,
} from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { useSelector } from 'react-redux'
import { getSidebarInfo } from '@/state/course/selectors'

export interface ISidebarProps {}

export default function Sidebar() {
    const data = useSelector(getSidebarInfo)
    const [scrollY, setScrollY] = useState(0)
    const [rightMargin, setRightMargin] = useState('0px')

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        handleScroll()

        setRightMargin(`${(window.innerWidth - 1190) / 2}px`)

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div
            className={`under_2xl:hidden bg-white z-20 right-[30px] w-[320px] drop-shadow-xl ${
                scrollY <= 500
                    ? 'absolute h-[860px]'
                    : `fixed top-[20px] h-[690px]`
            }`}
            style={scrollY > 500 ? { right: rightMargin } : {}}
        >
            <div
                className={`relative w-full video-preview ${
                    scrollY > 500 && 'hidden'
                }`}
            >
                <img
                    src="/svgs/thumbnails/thumbnail_1.svg"
                    alt=""
                    className="w-full"
                />
                <div className="flex flex-col items-center justify-center absolute z-30 w-full h-full top-[25px]">
                    <div className="flex items-center space-x-[20px] cursor-pointer">
                        <FontAwesomeIcon
                            icon={faPlay}
                            className="text-[24px] rounded-full bg-white py-[20px] px-[23px]"
                        />
                    </div>
                    <div className="font-semibold text-[14px] text-white mt-[35px]">
                        Preview this course
                    </div>
                </div>
            </div>
            <div className="space-y-4 mt-4">
                <div className="mx-7">
                    <div className="font-semibold text-[36px]">$14.81</div>
                    <div className="flex items-center justify-center space-x-4 mt-3 mb-5">
                        <Button className="btn-primary w-full">
                            <div className="text-white font-medium text-[20px]">
                                Enroll
                            </div>
                        </Button>
                        <FontAwesomeIcon
                            icon={faShareNodes}
                            className="text-[20px] rounded-full bg-white py-[14px] px-[16px] border border-black"
                        />
                    </div>
                    <div className="space-y-3">
                        <span className="font-bold">This course includes:</span>
                        <div className="flex space-x-3">
                            <div className="flex flex-col items-center space-y-3 pt-[2px]">
                                <FontAwesomeIcon
                                    icon={faTv}
                                    className="text-[20px]"
                                />
                                <FontAwesomeIcon
                                    icon={faFile}
                                    className="text-[20px]"
                                />
                                <FontAwesomeIcon
                                    icon={faCloudArrowDown}
                                    className="text-[20px]"
                                />
                                <FontAwesomeIcon
                                    icon={faCode}
                                    className="text-[20px]"
                                />
                                <FontAwesomeIcon
                                    icon={faInfinity}
                                    className="text-[20px]"
                                />
                                <FontAwesomeIcon
                                    icon={faMobileScreenButton}
                                    className="text-[20px]"
                                />
                                <FontAwesomeIcon
                                    icon={faClipboardList}
                                    className="text-[20px]"
                                />
                                <FontAwesomeIcon
                                    icon={faAward}
                                    className="text-[20px]"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <span>{data.duration}</span>
                                <span>{data.articles}</span>
                                <span>{data.resource}</span>
                                <span>{data.exercise}</span>
                                <span>{data.lifetimeAccess}</span>
                                <span>{data.device}</span>
                                <span>{data.assignments}</span>
                                <span>{data.certificate}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="mx-7">
                    <div className="font-bold text-[20px]">
                        Training 5 or more people?
                    </div>
                    <div className="mt-[10px] mb-[25px]">
                        Get your team access to 17,000+ top Skilline courses
                        anytime, anywhere.
                    </div>
                    <Button className="btn-primary-outline w-full">
                        <div className="font-medium text-[16px]">
                            Try Skilline Business
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}
