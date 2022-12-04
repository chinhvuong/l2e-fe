import useOutsideClick from '@/hooks/useOutSideClick'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import Loading from '../animate/loading'

export interface ISelectProps {
    label?: string
    selectList: string[]
    placeholder: string
    selected: string
    setSelected?: Function
    isLoading?: boolean
}

export default function Select(props: ISelectProps) {
    const [selected, setSelected] = useState(
        props.selected === '' ? props.placeholder : props.selected,
    )
    const [openSelect, setOpenSelect] = useState(false)
    const clickOutSideRef = useRef(null)

    const onSelect = (item: string) => {
        setSelected(item)
        props.setSelected && props.setSelected(item)
        setOpenSelect(false)
    }

    useOutsideClick(clickOutSideRef, () => {
        setOpenSelect(false)
    })

    const getSelectContent = () => {
        if (props.selectList.length === 1) {
            return (
                <div
                    className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer rounded-[20px]"
                    onClick={() => onSelect(props.selectList[0])}
                >
                    {props.selectList[0]}
                </div>
            )
        }
        if (props.selectList.length === 2) {
            return (
                <>
                    <div
                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-t-[20px] cursor-pointer"
                        onClick={() => onSelect(props.selectList[0])}
                    >
                        {props.selectList[0]}
                    </div>
                    <div
                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-b-[20px] cursor-pointer"
                        onClick={() => onSelect(props.selectList[1])}
                    >
                        {props.selectList[1]}
                    </div>
                </>
            )
        }
        if (props.selectList.length > 2) {
            return (
                <>
                    <div
                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-t-[20px] cursor-pointer"
                        onClick={() => onSelect(props.selectList[0])}
                    >
                        {props.selectList[0]}
                    </div>
                    {props.selectList.map((item, index) => {
                        if (
                            index !== 0 &&
                            index !== props.selectList.length - 1
                        ) {
                            return (
                                <div
                                    className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer"
                                    key={index}
                                    onClick={() => onSelect(item)}
                                >
                                    {item}
                                </div>
                            )
                        }
                    })}
                    <div
                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-b-[20px] cursor-pointer"
                        onClick={() =>
                            onSelect(
                                props.selectList[props.selectList.length - 1],
                            )
                        }
                    >
                        {props.selectList[props.selectList.length - 1]}
                    </div>
                </>
            )
        }
    }

    return (
        <div className="w-full relative">
            {props.label && (
                <div className="font-bold pb-2 pl-3 sm:text-xs sm:mt-2">
                    {props.label}
                </div>
            )}
            <div
                onClick={() => setOpenSelect(!openSelect)}
                ref={clickOutSideRef}
            >
                <div className="flex items-center justify-between py-[10px] rounded-[80px] border-[1px] border-black px-[20px] cursor-pointer hover:bg-border-box">
                    <div className="flex items-center space-x-2">
                        {selected}
                    </div>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-[12px]"
                    />
                </div>
                <div
                    className={`rounded-[20px] border-[1px] border-black absolute z-20 mt-1 bg-white drop-shadow-lg w-full ${
                        !openSelect && 'hidden'
                    }`}
                >
                    {props?.isLoading ? (
                        <div className="flex justify-center items-center h-20">
                            <Loading />
                        </div>
                    ) : (
                        getSelectContent()
                    )}
                </div>
            </div>
        </div>
    )
}
