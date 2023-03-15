import { QuestionDetailType } from '@/store/questions/types'
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
    questionsData: QuestionDetailType[]
}

export interface arrayInput {
    questions?: string[]
}

export default function FormikQuestionSelect({
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
    questionsData,
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
                    value={context.values.questions?.[index]}
                    onChange={context.handleChange}
                    onBlur={context.handleBlur}
                    className="w-full"
                >
                    {questionsData?.map((question, indext) => (
                        <option key={indext} value={question._id}>
                            {question.question}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
