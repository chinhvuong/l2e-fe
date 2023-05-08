import React, { useEffect, useState } from 'react'

export interface IValidateContent {
    landingPage: string[]
    intendedLearners: string[]
    curriculum: string[]
}

interface IValidateModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    validateContent: IValidateContent
}

export default function ValidateModal(props: IValidateModalProps) {
    const { isShow, setIsShow, validateContent } = props

    const [showModal, setShowModal] = useState(isShow)

    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center justify-between p-5">
                                    <div>
                                        <div className="text-xl font-bold mb-3">
                                            Why can&apos;t I submit for review?
                                        </div>
                                        <div className="grid gap-y-2">
                                            <p>
                                                You&apos;re almost ready to
                                                submit your course. Here are a
                                                few more items you need.
                                            </p>
                                            <ul className="list-disc grid gap-y-2 px-5">
                                                {validateContent.landingPage
                                                    .length > 0 && (
                                                    <li>
                                                        On the{' '}
                                                        <a href="https://www.udemy.com/course/4890572/manage/basics/">
                                                            <span className="text-hyperlink underline underline-offset-4">
                                                                Landing page
                                                            </span>
                                                        </a>{' '}
                                                        page, you must
                                                        <ul className="list-decimal grid gap-y-2 mt-2 px-5">
                                                            {validateContent.landingPage.map(
                                                                (el) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                el
                                                                            }
                                                                        >
                                                                            {el}
                                                                        </li>
                                                                    )
                                                                },
                                                            )}
                                                        </ul>
                                                    </li>
                                                )}
                                                {validateContent
                                                    .intendedLearners.length >
                                                    0 && (
                                                    <li>
                                                        On the{' '}
                                                        <a href="https://www.udemy.com/course/4890572/manage/goals/">
                                                            <span className="text-hyperlink underline underline-offset-4">
                                                                Intended
                                                                learners
                                                            </span>
                                                        </a>{' '}
                                                        page, you must
                                                        <ul className="list-decimal grid gap-y-2 mt-3 px-5">
                                                            {validateContent.intendedLearners.map(
                                                                (el) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                el
                                                                            }
                                                                        >
                                                                            {el}
                                                                        </li>
                                                                    )
                                                                },
                                                            )}
                                                        </ul>
                                                    </li>
                                                )}
                                                {validateContent.curriculum
                                                    .length > 0 && (
                                                    <li>
                                                        On the{' '}
                                                        <a href="https://www.udemy.com/course/4890572/manage/curriculum/">
                                                            <span className="text-hyperlink underline underline-offset-4">
                                                                Curriculum
                                                            </span>
                                                        </a>{' '}
                                                        page, you must
                                                        <ul className="list-decimal grid gap-y-2 mt-2 px-5">
                                                            {validateContent.curriculum.map(
                                                                (el) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                el
                                                                            }
                                                                        >
                                                                            {el}
                                                                        </li>
                                                                    )
                                                                },
                                                            )}
                                                        </ul>
                                                    </li>
                                                )}
                                            </ul>
                                            <p className="p2">
                                                Once you complete these steps,
                                                you will be able to successfully
                                                submit your course for review.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="absolute top-5 right-5 cursor-pointer bg-gray-300 px-2 rounded-full"
                                        onClick={() => handleShowModal(false)}
                                    >
                                        x
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-40"></div>
                </>
            ) : null}
        </>
    )
}
