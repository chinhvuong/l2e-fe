import useOutsideClick from '@/hooks/useOutSideClick'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'

export interface ISelectProps {
    label: string
    selectList: string[]
    placeholder: string
}

export default function Select(props: ISelectProps) {
    const [selectedRating, setSelectedRating] = useState(props.placeholder)
    const [openRatingSelect, setOpenRatingSelect] = useState(false)
    const clickOutSideRef = useRef(null)

    const onSelectRating = (item: string) => {
        setSelectedRating(item)
        setOpenRatingSelect(false)
    }

    useOutsideClick(clickOutSideRef, () => {
        setOpenRatingSelect(false)
    })

    return (
        <div className="w-full">
            <div className="font-bold pb-2 pl-3 sm:text-xs sm:mt-2">
                {props.label}
            </div>
            <div
                onClick={() => setOpenRatingSelect(!openRatingSelect)}
                ref={clickOutSideRef}
            >
                <div className="flex items-center justify-between py-[10px] rounded-[80px] border-[1px] border-black px-[20px] cursor-pointer hover:bg-border-box">
                    <div className="flex items-center space-x-2">
                        {selectedRating}
                    </div>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-[12px]"
                    />
                </div>
                <div
                    className={`py-[5px] rounded-[20px] border-[1px] border-black absolute z-20 mt-1 bg-white drop-shadow-lg ${
                        !openRatingSelect && 'hidden'
                    }`}
                >
                    {props.selectList.map((item) => {
                        return (
                            <div
                                className="hover:bg-primary hover:text-white box-border px-[20px] py-1.5 rounded-[12px] cursor-pointer"
                                key={item}
                                onClick={() => onSelectRating(item)}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
