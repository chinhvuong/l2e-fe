import { useFormikContext } from 'formik'

export interface ISelectProps {
    name?: string
    label?: string
    selectList?: string[]
    placeholder?: string
    selected?: string
    setSelected?: Function
    isLoading?: boolean
    disabled?: boolean
    validate?: boolean
    index: number
}

export interface arrayInput {
    questions?: [
        {
            choices?: string[]
            medias?: string[]
            correctAnswer: number
        },
    ]
}

export default function FormikSelect({
    name,
    label,
    // selectList,
    // placeholder,
    // selected,
    // setSelected,
    // isLoading,
    // disabled,
    // validate = false,
    index,
}: ISelectProps) {
    // const [selectedItem, setSelectedItem] = useState(
    //     selected === '' ? placeholder : selected,
    // )
    // const [openSelect, setOpenSelect] = useState(false)
    // const clickOutSideRef = useRef(null)
    const context = useFormikContext<arrayInput>()
    // const onSelect = (item: string) => {
    //     setSelectedItem(item)
    //     setSelected && setSelected(item)
    //     setOpenSelect(false)
    // }

    // const handleOpenSelect = () => {
    //     if (!disabled) {
    //         setOpenSelect(!openSelect)
    //     }
    // }

    // useOutsideClick(clickOutSideRef, () => {
    //     setOpenSelect(false)
    // })
    return (
        <div>
            {label && <div className="font-bold ml-[25px] pb-2">{label}</div>}
            <div
                className={`flex items-center justify-between py-[10px] rounded-[80px] px-[25px] border-[1px] space-x-5`}
            >
                <select
                    name={name}
                    value={parseInt(
                        String(context.values.questions?.[index].correctAnswer),
                    )}
                    onChange={(event) =>
                        context.setFieldValue(
                            String(name),
                            parseInt(event.target.value),
                        )
                    }
                    onBlur={context.handleBlur}
                    className="w-full"
                >
                    {context.values.questions?.[index].choices?.map(
                        (choice, indext) => (
                            <option key={indext} value={indext}>
                                {choice}
                            </option>
                        ),
                    )}
                </select>
            </div>
        </div>
    )
}
