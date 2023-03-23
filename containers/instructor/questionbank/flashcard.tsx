import { QuestionDetailType } from '@/store/questions/types'
export default function QuestionCard({
    question,
}: {
    question: QuestionDetailType
}) {
    return (
        <div className="my-10 mx-20 item-center w-3/4 p-2 bg-gray-200 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <div className="p-2">
                <h1 className="font-bold text-xl mb-2">{question?.question}</h1>
            </div>
            <div
                className="grid grid-cols-2
                gap-2"
            >
                {question?.choices.map((choice, index) => (
                    <div
                        key={index}
                        className={`inline-block ${
                            index === question?.correctAnswer
                                ? `bg-green-400 text-black`
                                : `bg-gray-600 text-white`
                        }`}
                    >
                        {choice}
                    </div>
                ))}
            </div>
        </div>
    )
}
