import Hyperlink from '@/containers/create-course/components/hyperlink'
import Input from '@/components/core/input'
import RichTextEditor from '@/components/core/rich-text-editor'
import Select from '@/components/core/select'
import UploadPreview from '@/components/core/upload-preview'
import Title from '../components/title'
import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getCourseName } from '@/store/course/selectors'
import {
    updateCourseLanguage,
    updateCourseName,
    updateCourseOverview,
    updateCoursePrice,
} from '@/store/course'
import { CATEGORY, CATEGORY_NAME_LIST } from '@/constants/localStorage'

export interface ILandingPageContainerProps {}

export default function LandingPageContainer() {
    const languageList = ['English', 'Vietnamese']
    // const category = [
    //     'IT',
    //     'Health',
    //     'Language',
    //     'Business',
    //     'Management',
    //     'Personal & Development',
    //     'Sales & Marketing',
    //     'Engineering & Construction',
    //     'Teaching & Academics',
    // ]
    const [title, setTitle] = useState(useAppSelector(getCourseName))
    const [subtitle, setSubtitle] = useState('')
    const [language, setLanguage] = useState('')
    const category = JSON.parse(
        localStorage.getItem(CATEGORY_NAME_LIST) ?? '[]',
    )
    const [price, setPrice] = useState<number | null>(null)

    const dispatch = useAppDispatch()

    const handleTitleChange = (value: string) => {
        setTitle(value)
        dispatch(updateCourseName(value))
    }
    const handleSubtitleChange = (value: string) => {
        setSubtitle(value)
        dispatch(updateCourseOverview(value))
    }
    const handleLanguageChange = (value: string) => {
        setLanguage(value)
        dispatch(updateCourseLanguage(value))
    }
    const handlePriceChange = (value: number) => {
        setPrice(value)
        dispatch(updateCoursePrice(value))
    }

    return (
        <div>
            <Title title={'Landing page'} />
            <div className="py-10 px-14 space-y-5">
                <Input
                    id="landing-page-title"
                    charLimit={{ minLength: 10, maxLength: 60 }}
                    label="Title"
                    placeholder="Insert your course title."
                    defaultValue={title}
                    updateInput={handleTitleChange}
                />
                <Input
                    id="landing-page-subtitle"
                    charLimit={{ minLength: 0, maxLength: 120 }}
                    label="Subtitle"
                    placeholder="Insert your course subtitle."
                    updateInput={handleSubtitleChange}
                />
                <div className="flex justify-between space-x-5">
                    <Select
                        label="Language"
                        selectList={languageList}
                        placeholder="Select language"
                        selected=""
                        setSelected={handleLanguageChange}
                    />
                    <Select
                        label="Category"
                        selectList={category}
                        placeholder="Select category"
                        selected=""
                    />
                    <div className="w-full">
                        <Input
                            id="landing-page-price"
                            label="Price (USDT)"
                            placeholder="Insert your course price."
                            updateInput={handlePriceChange}
                            type="number"
                        ></Input>
                    </div>
                </div>
                <RichTextEditor label="Description" />
                <UploadPreview label="Thumbnail" type="image">
                    <div>
                        <span>
                            {`Upload your course image here. It must meet our `}
                        </span>
                        <Hyperlink>course image quality standards</Hyperlink>
                        <span>{` to
                        be accepted. Important guidelines: 750x422 pixels; .jpg,
                        .jpeg,. gif, or .png. no text on the image.`}</span>
                    </div>
                </UploadPreview>
                <UploadPreview label="Promotional video" type="video">
                    <div>
                        <span>{`Students who watch a well-made promo video are `}</span>
                        <span className="font-bold">
                            5X more likely to enroll
                        </span>
                        <span>{`
                        in your course. We've seen that statistic go up to 10X
                        for exceptionally awesome videos. `}</span>
                        <Hyperlink>Learn how to make yours awesome!</Hyperlink>
                    </div>
                </UploadPreview>
            </div>
        </div>
    )
}
