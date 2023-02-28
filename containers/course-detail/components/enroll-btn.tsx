import Loading from '@/components/core/animate/loading'
import Button from '@/components/core/button'
import { enroll } from '@/hooks/coursedex'
import { approve } from '@/hooks/usdt'
import { getCourseOverviewInfo } from '@/store/course/selectors'
import { getAssetState } from '@/store/user/selectors'
import { ethers } from 'ethers'
import React, { HtmlHTMLAttributes, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useSigner } from 'wagmi'
import { goerli } from 'wagmi/chains'
type Props = HtmlHTMLAttributes<HTMLButtonElement> & {}

const EnrollBtn = ({ ...rest }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const asset = useSelector(getAssetState)
    const data = useSelector(getCourseOverviewInfo)
    const { data: signer } = useSigner({
        chainId: goerli.id,
    })

    // const { address } = useAccount()
    const enrollCourse = async (courseId: number) => {
        if (isLoading) {
            return
        }
        if (asset.balance >= data.price) {
            setIsLoading(true)
            try {
                // if (asset.approve / 10 ** 18 <= Number(data.price)) {
                //     await approve(
                //         signer as ethers.Signer,
                //         data.price.toString(),
                //     )
                // }

                await enroll(
                    signer as ethers.Signer,
                    data.price.toString(),
                    courseId,
                )
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        } else {
            toast.error('You are not balance!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: 'light',
            })
        }
    }
    return (
        <Button
            className="w-full flex items-center justify-center"
            onClick={() => enrollCourse(Number(data.courseId))}
            {...rest}
        >
            <div className="font-medium text-[20px]">Enroll</div>
            {isLoading && <Loading className="!text-white" />}
        </Button>
    )
}

export default EnrollBtn
