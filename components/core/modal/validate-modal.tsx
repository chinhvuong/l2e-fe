import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import './style.scss'

export interface IValidateContent {
    landingPage: string[]
    intendedLearners: string[]
    curriculum: string[]
    userProfile: string[]
}

interface IValidateModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    validateContent: IValidateContent
}

export default function ValidateModal(props: IValidateModalProps) {
    const { isShow, setIsShow, validateContent } = props
    const { setCurrentTab } = useCreateCourseContext()

    const [showModal, setShowModal] = useState(isShow)
    const router = useRouter()

    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
    }
    const goToSelectedTab = (tab: string) => {
        setShowModal(false)
        setIsShow(false)
        setCurrentTab(tab)
        Router.push(`/create-course/${router.query.slug}/${tab}`)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center fixed inset-0 z-40 outline-none focus:outline-none">
                        <div className="relative">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="p-10 max-h-[500px] overflow-y-auto scrollbar">
                                    <div className="space-y-5 max-w-3xl">
                                        <div className="pb-5 space-y-5">
                                            <div>
                                                <div className="text-xl font-bold mb-3">
                                                    Why can&apos;t I submit for
                                                    review?
                                                </div>
                                                <div className="grid gap-y-2">
                                                    <p>
                                                        You&apos;re almost ready
                                                        to submit your course.
                                                        Here are a few more
                                                        items you need.
                                                    </p>
                                                    <ul className="list-disc grid gap-y-2 px-5">
                                                        {validateContent
                                                            .landingPage
                                                            .length > 0 && (
                                                            <li>
                                                                On the{' '}
                                                                <span
                                                                    className="text-hyperlink underline underline-offset-4 cursor-pointer"
                                                                    onClick={() =>
                                                                        goToSelectedTab(
                                                                            'landing-page',
                                                                        )
                                                                    }
                                                                >
                                                                    Landing page
                                                                </span>{' '}
                                                                page, you must
                                                                <ul className="list-decimal grid gap-y-2 mt-2 px-5">
                                                                    {validateContent.landingPage.map(
                                                                        (
                                                                            el,
                                                                        ) => {
                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        el
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        el
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        },
                                                                    )}
                                                                </ul>
                                                            </li>
                                                        )}
                                                        {validateContent
                                                            .intendedLearners
                                                            .length > 0 && (
                                                            <li>
                                                                On the{' '}
                                                                <span
                                                                    className="text-hyperlink underline underline-offset-4 cursor-pointer"
                                                                    onClick={() =>
                                                                        goToSelectedTab(
                                                                            'intended-learners',
                                                                        )
                                                                    }
                                                                >
                                                                    Intended
                                                                    learners
                                                                </span>{' '}
                                                                page, you must
                                                                <ul className="list-decimal grid gap-y-2 mt-3 px-5">
                                                                    {validateContent.intendedLearners.map(
                                                                        (
                                                                            el,
                                                                        ) => {
                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        el
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        el
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        },
                                                                    )}
                                                                </ul>
                                                            </li>
                                                        )}
                                                        {validateContent
                                                            .curriculum.length >
                                                            0 && (
                                                            <li>
                                                                On the{' '}
                                                                <span
                                                                    className="text-hyperlink underline underline-offset-4 cursor-pointer"
                                                                    onClick={() =>
                                                                        goToSelectedTab(
                                                                            'curriculum',
                                                                        )
                                                                    }
                                                                >
                                                                    Curriculum
                                                                </span>{' '}
                                                                page, you must
                                                                <ul className="list-decimal grid gap-y-2 mt-2 px-5">
                                                                    {validateContent.curriculum.map(
                                                                        (
                                                                            el,
                                                                        ) => {
                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        el
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        el
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        },
                                                                    )}
                                                                </ul>
                                                            </li>
                                                        )}
                                                        {validateContent
                                                            .userProfile
                                                            .length > 0 && (
                                                            <li>
                                                                On the{' '}
                                                                <span
                                                                    className="text-hyperlink underline underline-offset-4 cursor-pointer"
                                                                    onClick={() =>
                                                                        goToSelectedTab(
                                                                            'profile',
                                                                        )
                                                                    }
                                                                >
                                                                    Profile
                                                                </span>{' '}
                                                                page, you must
                                                                <ul className="list-decimal grid gap-y-2 mt-2 px-5">
                                                                    {validateContent.userProfile.map(
                                                                        (
                                                                            el,
                                                                        ) => {
                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        el
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        el
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        },
                                                                    )}
                                                                </ul>
                                                            </li>
                                                        )}
                                                    </ul>
                                                    <p className="p2">
                                                        Once you complete these
                                                        steps, you will be able
                                                        to successfully submit
                                                        your course for review.
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className="absolute top-5 right-5 cursor-pointer bg-gray-300 px-2 rounded-full"
                                                onClick={() =>
                                                    handleShowModal(false)
                                                }
                                            >
                                                x
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-30"></div>
                </>
            ) : null}
        </>
    )
}
