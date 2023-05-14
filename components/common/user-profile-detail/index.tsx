import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
} from '@/components/core/icons'
import { User } from '@/store/user/types'
import { faAward, faStar, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import parse from 'html-react-parser'
import { useEffect } from 'react'

export interface IUserProfileDetailProps {
    data: User
    className?: string
    showShortDescription?: boolean
}

export default function UserProfileDetail({
    data,
    className,
    showShortDescription = false,
}: IUserProfileDetailProps) {
    const convertStringToHTML = () => {
        if (data.bio) {
            const element = document.getElementById('instructor-bio-content')
            let displayedData = data.bio.replace(
                /'<li>'/g,
                '<li class="list-disc list-inside ml-2">',
            )
            displayedData = displayedData.replace(
                /'<ul>'/g,
                '<ul class="space-y-3">',
            )

            if (element) {
                element.innerHTML = displayedData
            }
        }
        return ''
    }

    const getUIContent = (content: string) => {
        let formattedData = ''

        formattedData = content.replace(
            /'<li>'/g,
            '<li class="list-disc list-inside ml-2">',
        )
        formattedData = formattedData.replace(
            /'<ul>'/g,
            '<ul class="space-y-3">',
        )

        return (
            <div className="text-justify space-y-3">{parse(formattedData)}</div>
        )
    }

    useEffect(() => {
        if (data && data.bio) {
            convertStringToHTML()
        }
    }, [data])

    return (
        <>
            <div className="font-semibold text-2xl mb-1 text-hyperlink cursor-pointer">
                {data?.name}
            </div>
            {showShortDescription && (
                <>
                    <div className="text-description mt-1">
                        {(data?.title || (data?.title && data.title === '')) ??
                            'No title'}
                    </div>
                    <div className="flex space-x-5 py-3">
                        <FacebookIcon fillColor="#000000" width="20px" />
                        <TwitterIcon fillColor="#000000" width="20px" />
                        <InstagramIcon fillColor="#000000" width="20px" />
                        <YoutubeIcon fillColor="#000000" width="20px" />
                    </div>
                </>
            )}
            <div className="flex items-center my-4">
                {data.avatar !== null ? (
                    <img
                        src={`${data?.avatar}`}
                        alt=""
                        className="rounded-[50%] w-[120px]"
                    />
                ) : (
                    <img
                        src="/svgs/default_user_avatar.svg"
                        alt=""
                        className="rounded-[50%] w-[120px]"
                    />
                )}
                <div className="flex flex-col space-y-2 ml-7 mr-4">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faStar} />
                        <div>4.7 Instructor Rating</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="text-sm"
                        />
                        <div>526,234 Reviews</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faAward}
                            className="text-xl mr-0.5"
                        />
                        <div>1,634,289 Students</div>
                    </div>
                </div>
            </div>
            <div id="instructor" className="space-y-3 overflow-hidden relative">
                <div className="text-justify space-y-3">
                    {data?.bio && getUIContent(data?.bio)}
                </div>
            </div>
        </>
    )
}
