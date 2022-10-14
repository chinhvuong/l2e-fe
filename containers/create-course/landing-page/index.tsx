import Input from '@/components/core/input'
import Select from '@/components/core/select'
import * as React from 'react'
import Title from '../components/title'

export interface ILandingPageContainerProps {}

export default function LandingPageContainer() {
    const language = ['English', 'Vietnamese']
    const level = ['Beginner', 'Intermediate', 'Expert', 'All levels']
    const category = [
        'IT',
        'Health',
        'Language',
        'Business',
        'Management',
        'Personal & Development',
        'Sales & Marketing',
        'Engineering & Construction',
        'Teaching & Academics',
    ]

    return (
        <div>
            <Title title={'Course landing page'} />
            <div className="py-10 px-14 space-y-4">
                <Input
                    charLimit={{ minLength: 10, maxLength: 60 }}
                    label="Course title"
                    placeholder="Insert your course title."
                />
                <Input
                    charLimit={{ minLength: 0, maxLength: 120 }}
                    label="Course subtitle"
                    placeholder="Insert your course subtitle."
                />
                <div className="flex justify-between space-x-5">
                    <Select
                        label="Language"
                        selectList={language}
                        placeholder="Select language"
                    />
                    <Select
                        label="Level"
                        selectList={level}
                        placeholder="Select level"
                    />
                    <Select
                        label="Category"
                        selectList={category}
                        placeholder="Select category"
                    />
                </div>
            </div>
            {/* <RichTextEditor /> */}
        </div>
    )
}
