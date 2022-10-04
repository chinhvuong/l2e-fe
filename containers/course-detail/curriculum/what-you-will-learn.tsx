import * as React from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IWhatYouWillLearnProps {}

export default function WhatYouWillLearn() {
    const data = [
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

    return (
        <div className="border border-divider w-full space-y-3 py-6 px-9">
            <span className="font-semibold text-[26px]">What you’ll learn</span>
            <div className="flex flex-wrap justify-between">
                {data.map((item, index) => {
                    return (
                        <div
                            className="flex items-start space-x-3 mb-2"
                            key={index}
                        >
                            <FontAwesomeIcon icon={faCheck} className="mt-1" />
                            <div className="w-[330px] text-justify">{item}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
