import { useState, useEffect } from 'react'
import {
    faCheck,
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IWhatYouWillLearnProps {}

export default function WhatYouWillLearn() {
    const [elHeight, setElHeight] = useState(0)
    const [showFullContent, setShowFullContent] = useState(false)

    const data = [
        'You will master the Python programming language by building 100 unique projects over 100 days. You will be able to program in Python professionally',
        'You will learn automation, game, app and web development, data science and machine learning all using Python.',
        'You will be able to program in Python professionally. You will be able to program in Python professionally',
        'You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib. You will be able to program in Python professionally',
        'Create a portfolio of 100 Python projects to apply for developer jobs.',
        'Be able to build fully fledged websites and web apps with Python. You will be able to program in Python professionally. You will be able to program in Python professionally',
        'Be able to use Python for data science and machine learning',
        'Build games like Blackjack, Pong and Snake using Python',
        'Build GUIs and Desktop applications with Python',
        'You will master the Python programming language by building 100 unique projects over 100 days.',
        'You will learn automation, game, app and web development, data science and machine learning all using Python.',
        'You will be able to program in Python professionally',
        'You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib.',
        'Create a portfolio of 100 Python projects to apply for developer jobs',
        'Be able to build fully fledged websites and web apps with Python',
        'Be able to use Python for data science and machine learning',
        'Build games like Blackjack, Pong and Snake using Python',
        'Build GUIs and Desktop applications with Python',
    ]

    useEffect(() => {
        setElHeight(
            document.getElementById('what-you-will-learn')?.scrollHeight ?? 0,
        )
    }, [])

    return (
        <div
            id="what-you-will-learn"
            className={`border border-border-box w-full space-y-3 py-6 px-9 overflow-hidden relative ${
                elHeight > 400 && !showFullContent && 'h-[400px]'
            }`}
        >
            <span className="font-semibold text-[26px]">What you’ll learn</span>
            <div className="flex flex-wrap justify-between">
                {data.map((item, index) => {
                    return (
                        <div
                            className="flex items-start space-x-3 mb-2"
                            key={index}
                        >
                            <FontAwesomeIcon icon={faCheck} className="mt-1" />
                            <div
                                className={`w-[330px] text-justify ${
                                    !showFullContent && 'line-clamp-3'
                                }`}
                            >
                                {item}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div
                className={`flex flex-col justify-end z-10 top-1 left-0 w-full h-full ${
                    elHeight <= 400 && 'hidden'
                } ${!showFullContent && 'absolute'} `}
            >
                <div
                    className={`h-full ${
                        !showFullContent &&
                        'bg-gradient-to-b from-transparent to-white'
                    }`}
                ></div>
                <div
                    className={`cursor-pointer ${
                        !showFullContent && 'pl-9 pb-9 bg-white'
                    }`}
                    onClick={() => setShowFullContent(!showFullContent)}
                >
                    <span className="text-hyperlink font-bold mr-2">
                        Show {!showFullContent ? 'more' : 'less'}
                    </span>
                    <FontAwesomeIcon
                        icon={!showFullContent ? faChevronDown : faChevronUp}
                        className="text-hyperlink"
                    />
                </div>
            </div>
        </div>
    )
}
