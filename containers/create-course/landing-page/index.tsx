import Hyperlink from '@/containers/create-course/components/hyperlink'
import Input from '@/components/core/input'
import RichTextEditor from '@/components/core/rich-text-editor'
import Select from '@/components/core/select'
import UploadPreview from '@/components/core/upload-preview'
import Title from '../components/title'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getCourseDetail, getCourseDetailState } from '@/store/course/selectors'
import {
    updateCourseLanguage,
    updateCourseName,
    updateCourseOverview,
    updateCoursePrice,
    updateCourseThumbnail,
} from '@/store/course'
import { CATEGORY, CATEGORY_NAME_LIST } from '@/constants/localStorage'
import { convertToCategoryName, getLanguageName } from '@/utils'
import Loading from '../../../components/core/animate/loading'

export interface ILandingPageContainerProps {}

export default function LandingPageContainer() {
    const languageList = { en: 'English', vi: 'Vietnamese' }

    const dispatch = useAppDispatch()
    const courseDetail = useAppSelector(getCourseDetail)
    const isNewCourseDetail = useAppSelector(getCourseDetailState)
    const [isLoading, setIsLoading] = useState(true)

    const [title, setTitle] = useState<string>(courseDetail.name)
    const [subtitle, setSubtitle] = useState<string>(courseDetail.overview)
    const [language, setLanguage] = useState<string>(
        getLanguageName(courseDetail.language),
    )
    const [categoryList, setCategoryList] = useState([])
    const [category, setCategory] = useState<string>('')
    const [price, setPrice] = useState<string>(() =>
        courseDetail.price === 0 ? '' : courseDetail.price.toString(),
    )
    const [thumbnail, setThumbnail] = useState<string>(
        '/images/placeholder.jpeg',
    )
    // const [promotionalVideo, setPromotionalVideo] = useState<string>(
    //     '/images/placeholder.jpeg',
    // )

    useEffect(() => {
        const listWithId = JSON.parse(localStorage.getItem(CATEGORY) ?? '[]')
        const nameList = JSON.parse(
            localStorage.getItem(CATEGORY_NAME_LIST) ?? '[]',
        )
        setCategoryList(nameList)
        setCategory(convertToCategoryName(listWithId, courseDetail.category))
        if (isNewCourseDetail) {
            setTitle(courseDetail.name)
            setSubtitle(courseDetail.overview)
            setLanguage(getLanguageName(courseDetail.language))
            setPrice(
                courseDetail.price === 0 ? '' : courseDetail.price.toString(),
            )
            setThumbnail(courseDetail.thumbnail ?? '/images/placeholder.jpeg')
            // setPromotionalVideo(
            //     courseDetail.thumbnail ?? '/images/placeholder.jpeg',
            // )
        }
        if (courseDetail._id !== '') {
            setIsLoading(false)
        }
    }, [isNewCourseDetail])

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
    const handlePriceChange = (value: string) => {
        setPrice(value)
        dispatch(updateCoursePrice(parseInt(value)))
    }
    const handleThumbnailChange = (value: string) => {
        dispatch(updateCourseThumbnail(value))
    }

    return (
        <div>
            <Title title={'Landing page'} />
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <Loading />
                </div>
            ) : (
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
                        defaultValue={subtitle}
                        updateInput={handleSubtitleChange}
                    />
                    <div className="flex justify-between space-x-5">
                        <Select
                            label="Language"
                            selectList={Object.values(languageList)}
                            placeholder="Select language"
                            selected={language}
                            setSelected={handleLanguageChange}
                        />
                        <Select
                            label="Category"
                            selectList={categoryList}
                            placeholder="Select category"
                            selected={category}
                        />
                        <div className="w-full">
                            <Input
                                id="landing-page-price"
                                label="Price (USDT)"
                                placeholder="Insert your course price."
                                defaultValue={price}
                                updateInput={handlePriceChange}
                                type="number"
                            ></Input>
                        </div>
                    </div>
                    <RichTextEditor label="Description" />
                    <UploadPreview
                        label="Thumbnail"
                        type="image"
                        defaultPreview={thumbnail}
                        setFileLink={handleThumbnailChange}
                    >
                        <div>
                            <span>
                                {`Upload your course image here. It must meet our `}
                            </span>
                            <Hyperlink>
                                course image quality standards
                            </Hyperlink>
                            <span>{` to
                        be accepted. Important guidelines: 750x422 pixels; .jpg,
                        .jpeg,. gif, or .png. no text on the image.`}</span>
                        </div>
                    </UploadPreview>
                    <UploadPreview
                        label="Promotional video"
                        type="video"
                        defaultPreview="/images/placeholder.jpeg"
                    >
                        <div>
                            <span>{`Students who watch a well-made promo video are `}</span>
                            <span className="font-bold">
                                5X more likely to enroll
                            </span>
                            <span>{`
                        in your course. We've seen that statistic go up to 10X
                        for exceptionally awesome videos. `}</span>
                            <Hyperlink>
                                Learn how to make yours awesome!
                            </Hyperlink>
                        </div>
                    </UploadPreview>
                </div>
            )}
        </div>
    )
}
