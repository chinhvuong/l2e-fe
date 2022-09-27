import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/core/button'

export default function AboutUs() {
    return (
        <div>
            <div className="bg-[#0F124D] h-[550px] flex justify-center items-center text-white space-x-10 px-14">
                <div className="w-[540px] space-y-7 px-[10px]">
                    <div className="font-bold text-5xl">
                        <div>
                            We share{' '}
                            <span className="text-[#F48C06]">knowledge</span>
                        </div>
                        <div>with the world</div>
                    </div>
                    <div>
                        Whether you want to learn or to share what you know,
                        you’ve come to the right place. As a global destination
                        for online learning, we connect people through
                        knowledge.
                    </div>
                    <div className="flex items-center space-x-[30px]">
                        <Button className="btn-primary">Join us now</Button>
                        <div className="flex items-center space-x-[20px] cursor-pointer">
                            <FontAwesomeIcon
                                icon={faPlay}
                                style={{
                                    color: '#23BDEE',
                                    borderRadius: '100%',
                                    backgroundColor: 'white',
                                    padding: '16px 18px',
                                }}
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
                    className="max-w-full max-h-full xl:w-[500px] lg:w-[300px] md:w-[300px]"
                />
            </div>
            <img src="/svgs/curvedPart.svg" alt="" className="w-full" />
        </div>
    )
}
