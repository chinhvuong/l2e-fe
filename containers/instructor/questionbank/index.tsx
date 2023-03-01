import Button from '@/components/core/button'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { QuestionDetailType } from '@/store/question/types'
import { useAppSelector } from '@/hooks'
import { getQuestionsInfo } from '@/store/question/selectors'

export default function QuestionBankContainers() {
    const router = useRouter()
    const questionsData = useAppSelector(getQuestionsInfo)
    const goToCreateQuestionsPage = () => {
        router.push({
            pathname: router.pathname + '/create',
            query: { ...router.query },
        })
    }
    console.log(questionsData)
    return (
        <div>
            <div
                className="ml-auto mr-auto max-w-7xl grid-cols-3 app-transition main-transition min-h-screen bg-white"
                id="content"
            >
                <div className="flex flex-row justify-between">
                    <h1 className="flex basis-full text-3xl font-semibold">
                        {' '}
                        Question Bank
                    </h1>
                </div>
                <div className="flex flex-col justify-between leading-relaxed text-black">
                    <div className="block"></div>
                    <div className="flex h-full w-full m-auto"></div>
                </div>
                <div className="block mr-80 min-w-0">
                    <div className="block leading-relaxed">
                        <section className="block m-0">
                            <div className="p-0">
                                <section className="block ">
                                    <div className="block">
                                        {questionsData.map((item, index) => (
                                            <div
                                                key={index}
                                                className="p-0.25 rounded inline-block shadow-3xl min-h-r w-full"
                                            >
                                                <div className="p-4 w-full block">
                                                    <div className="inline-block float-left w-4/5 mt-2 align-top">
                                                        <div className="py-0 px-2 flex">
                                                            <div className="text-black w-2/5">
                                                                <span className="text-black">
                                                                    {
                                                                        item.question
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="text-black w-2/5">
                                                                <span className="text-black">
                                                                    {
                                                                        item
                                                                            .choices[
                                                                            item
                                                                                .correctAnswer
                                                                        ]
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="text-white justify-center flex flex-row">
                    <Button
                        className="flex items-center gap-4 p-1 text-sm"
                        onClick={() => goToCreateQuestionsPage()}
                    >
                        <span>Create Question</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
