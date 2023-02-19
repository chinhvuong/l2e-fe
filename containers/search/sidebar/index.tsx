import Button from '@/components/core/button'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import useWeb3 from '@/wallet/hooks/useWeb3'
import RatingStar from '@/components/core/rating-star'

export interface IMyCoursesLayoutProps {}
export interface ISidebarProps {
    onRadioBoxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    rating: number
}

export default function Sidebar(props: ISidebarProps) {
    const { disconnect } = useWeb3()
    const dispatch = useAppDispatch()
    const rating = ['4.5', '4', '3.5', '3']
    const [myprice, setMyprice] = useState(
        { free: false, paid: false },
    )
    const [currentrating, setRating] = useState<number>(0)
    return (
        <div className="space-y-10 flex flex-col justify-start w-[300px] pt-7">
            <div className="space-y-2 flex flex-col">
                <hr className="bg-black border-[1px]"></hr>
                <div className="font-semibold text-[20px] ml-5">Rating</div>
                {rating.map((item, index) => {
                    return (
                        <div
                            className={`text-black cursor-pointer rounded-r-full py-3 px-5 flex`}
                            key={index}
                            onChange={props.onRadioBoxChange}
                        >
                            <input className={`mr-2 flex`} type="radio" value={item} checked ={props.rating === parseFloat(item)}/>
                            <RatingStar
                                ratings={item + ' && up'}
                                id={index.toString()}
                                ratingScore={parseFloat(item)}
                                hideScore
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
