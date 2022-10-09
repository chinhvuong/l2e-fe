import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import ReviewItemsList from './components/review-items-list'

export interface IReviewDetailProps {}

export default function ReviewDetail() {
    const [selectedRating, setSelectedRating] = useState('All ratings')
    const [openRatingSelect, setOpenRatingSelect] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const ratingsValue = [
        'All ratings',
        'Five stars',
        'Four stars',
        'Three stars',
        'Two stars',
        'One star',
    ]

    const data = [1, 2, 3]

    const onSelectRating = (item: string) => {
        setSelectedRating(item)
        setOpenRatingSelect(false)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpenRatingSelect(false)
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })
    return (
        <div className="w-[820px] ml-[10px] mt-5">
            <div className="font-semibold text-[26px]">Reviews</div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 mr-4">
                    <div
                        className={`w-[560px] py-[10px] rounded-[80px] pl-[20px] border-[1px] border-black`}
                    >
                        <input
                            className="w-[350px] outline-none"
                            placeholder="Search..."
                        ></input>
                    </div>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="bg-primary p-4 rounded-full text-white"
                    />
                </div>
                <div className="mb-8">
                    <div className="font-bold pb-2 pl-3">Filter ratings</div>
                    <div>
                        <div
                            className="flex items-center justify-between w-[150px] py-[10px] rounded-[80px] border-[1px] border-black px-[20px] cursor-pointer hover:bg-border-box"
                            onClick={() =>
                                setOpenRatingSelect(!openRatingSelect)
                            }
                        >
                            <div>{selectedRating}</div>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className="text-[12px]"
                            />
                        </div>
                        <div
                            className={`w-[150px] py-[5px] rounded-[20px] border-[1px] border-black absolute z-20 mt-1 bg-white drop-shadow-lg ${
                                !openRatingSelect && 'hidden'
                            }`}
                            ref={ref}
                        >
                            {ratingsValue.map((item) => {
                                return (
                                    <div
                                        className="hover:bg-primary hover:text-white box-border pl-[20px] py-1.5 rounded-[12px] cursor-pointer"
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
            </div>
            <ReviewItemsList data={data} />
        </div>
    )
}
