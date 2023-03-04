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
    disabled?: boolean
    validate?: boolean
}

export default function Select({
    label,
    selectList,
    placeholder,
    selected,
    setSelected,
    isLoading,
    disabled,
    validate = false,
}: ISelectProps) {
    const [selectedItem, setSelectedItem] = useState(
        selected === '' ? placeholder : selected,
    )
    const [openSelect, setOpenSelect] = useState(false)
    const clickOutSideRef = useRef(null)

    const onSelect = (item: string) => {
        setSelectedItem(item)
        setSelected && setSelected(item)
        setOpenSelect(false)
    }

    const handleOpenSelect = () => {
        if (!disabled) {
            setOpenSelect(!openSelect)
        }
    }

    useOutsideClick(clickOutSideRef, () => {
        setOpenSelect(false)
    })

    const getSelectContent = () => {
        if (selectList.length === 1) {
            return (
                <div
                    className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer rounded-[20px]"
                    onClick={() => onSelect(selectList[0])}
                >
                    {selectList[0]}
                </div>
            )
        }
        if (selectList.length === 2) {
            return (
                <>
                    <div
                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-t-[20px] cursor-pointer"
                        onClick={() => onSelect(selectList[0])}
                    >
                        {selectList[0]}
                    </div>
                    <div
                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-b-[20px] cursor-pointer"
                        onClick={() => onSelect(selectList[1])}
                    >
                        {selectList[1]}
                    </div>
                </>
            )
        }
        if (selectList.length > 2) {
            return (
                <>
                    <div
                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-t-[20px] cursor-pointer"
                        onClick={() => onSelect(selectList[0])}
                    >
                        {selectList[0]}
                    </div>
                    {selectList.map((item, index) => {
                        if (index !== 0 && index !== selectList.length - 1) {
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
                            onSelect(selectList[selectList.length - 1])
                        }
                    >
                        {selectList[selectList.length - 1]}
                    </div>
                </>
            )
        }
    }

    return (
        <div className="w-full relative">
            {label && (
                <div className="font-bold pb-2 pl-[25px] sm:text-xs sm:mt-2">
                    {label}
                </div>
            )}
            <div onClick={() => handleOpenSelect()} ref={clickOutSideRef}>
                <div
                    className={`flex items-center justify-between py-[10px] rounded-[80px] border-[1px] border-black px-[25px] hover:bg-gray-300 ${
                        disabled
                            ? 'bg-slate-300 cursor-not-allowed'
                            : 'bg-white cursor-pointer'
                    }`}
                >
                    <div className="flex items-center">{selectedItem}</div>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-[12px]"
                    />
                    {/* <div className="flex space-x-2 items-center">
                        <div
                            className="rounded-full bg-gray-400 py-1 px-2 text-xs"
                            onClick={() => onSelect('')}
                        >
                            x
                        </div>
                    
                    </div> */}
                </div>
                <div
                    className={`rounded-[20px] border-[1px] border-black absolute z-20 mt-1 bg-white drop-shadow-lg w-full ${
                        !openSelect && 'hidden'
                    }`}
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center h-20">
                            <Loading />
                        </div>
                    ) : (
                        getSelectContent()
                    )}
                </div>
            </div>
            {validate && (
                <div
                    className={`ml-[25px] text-sm mt-1 ${
                        validate && selectedItem === placeholder
                            ? 'text-red-500'
                            : 'text-white'
                    }`}
                >
                    Không được để trống!
                </div>
            )}
        </div>
    )
}
