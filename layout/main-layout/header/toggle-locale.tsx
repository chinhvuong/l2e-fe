import React, { useMemo } from 'react'
import GlobalIcon from '@/public/svgs/global.svg'
import Arrow from '@/public/svgs/arrow-up.svg'
import './style.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SUPPORT_LANGUAGES = [
    {
        name: 'Tiếng việt',
        key: 'vi',
    },
    {
        name: 'English',
        key: 'en',
    },
]
const ToggleLocale = () => {
    const router = useRouter()
    const currentLanguage = useMemo(() => {
        for (let i = 0; i < SUPPORT_LANGUAGES.length; i++) {
            if (SUPPORT_LANGUAGES[i].key === router.locale) {
                return SUPPORT_LANGUAGES[i].name
            }
        }
        return SUPPORT_LANGUAGES[0].name
    }, [router.locale, router.isReady])

    const toggle = () => {
        const box = document.getElementById('languages-box')
        if (box) {
            box.classList.toggle('open')
        }
    }
    return (
        <div className="flex gap-1 items-center relative" onClick={toggle}>
            <GlobalIcon className="sm:scale-[1.111]" />
            <div className="flex gap-2 items-center cursor-pointer sm:hidden">
                <span className="text-xs leading-[1] text-white">
                    {currentLanguage}
                </span>
                <Arrow className="rotate-180 scale-75 text-white" />
            </div>

            <div
                id={'languages-box'}
                className="languages-box absolute bg-white rounded-[4px] shadow-30 p-[10px] w-full"
            >
                {SUPPORT_LANGUAGES.map((item) => (
                    <Link
                        href={router.asPath}
                        locale={item.key}
                        key={item.key}
                        passHref
                    >
                        <div
                            className={`first:mb-2 cursor-pointer text-[10px] leading-[15px] text-black/70 ${
                                router.locale === item.key && '!text-pri'
                            } `}
                        >
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ToggleLocale
