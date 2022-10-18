import Hyperlink from '@/containers/create-course/components/hyperlink'
import Input from '@/components/core/input'
import RichTextEditor from '@/components/core/rich-text-editor'
import Select from '@/components/core/select'
import UploadPreview from '@/components/core/upload-preview'
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
            <Title title={'Landing page'} />
            <div className="py-10 px-14 space-y-5">
                <Input
                    charLimit={{ minLength: 10, maxLength: 60 }}
                    label="Title"
                    placeholder="Insert your course title."
                />
                <Input
                    charLimit={{ minLength: 0, maxLength: 120 }}
                    label="Subtitle"
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
                <div className="w-1/3 pr-4">
                    <Input
                        label="Price (USDT)"
                        placeholder="Insert your course price."
                    ></Input>
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
