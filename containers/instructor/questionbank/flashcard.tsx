import { QuestionDetailType } from '@/store/questions/types'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function QuestionCard({
    question,
}: {
    question: QuestionDetailType
}) {
    const answerPrefix = ['A. ', 'B. ', 'C. ', 'D. ']

    return (
        <div className="my-10 mx-20 item-center w-3/4 p-5 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <div className="p-4">
                <h1 className="font-bold text-xl mb-2">{question?.question}</h1>
            </div>
            <div
                className="grid grid-cols-2
                gap-5"
            >
                {question?.choices.map((choice, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-center rounded-[80px] py-3 px-6 border-2 font-medium ${
                            index === question?.correctAnswer
                                ? `bg-green-400 bg-opacity-10 text-green-400 border-green-400`
                                : `text-description border-description`
                        }`}
                    >
                        <span>{answerPrefix[index] + choice}</span>
                        {index === question?.correctAnswer && (
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                className="text-[20px] text-green-400"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
