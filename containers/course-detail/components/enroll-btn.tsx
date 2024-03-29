import Loading from '@/components/core/animate/loading'
import Button from '@/components/core/button'
import { useAppSelector } from '@/hooks'
import { enroll } from '@/hooks/coursedex'
import { approve } from '@/hooks/usdt'
import { getAssetState, getLoginState } from '@/store/user/selectors'
import { ethers } from 'ethers'
import { HtmlHTMLAttributes, useState } from 'react'
import { toast } from 'react-toastify'
import { useSigner } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { useCourseDetailContext } from '../course-detail-context'
type Props = HtmlHTMLAttributes<HTMLButtonElement> & {}

const EnrollBtn = ({ ...rest }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const asset = useAppSelector(getAssetState)
    const loginState = useAppSelector(getLoginState)
    const { data } = useCourseDetailContext()
    const { data: signer } = useSigner({
        chainId: sepolia.id,
    })
    const enrollCourse = async (courseId: number | undefined) => {
        if (isLoading || !data?.price || !courseId) {
            return
        }
        if (!loginState) {
            toast.error(`You haven't connected wallet!`, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                progress: undefined,
                theme: 'light',
            })
        } else if (asset.balance >= data.price) {
            setIsLoading(true)
            try {
                if (asset.approve / 10 ** 18 <= Number(data.price)) {
                    await approve(
                        signer as ethers.Signer,
                        data.price.toString(),
                    )
                }
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
            toast.error(`You don't have enough balance!`, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                progress: undefined,
                theme: 'light',
            })
        }
    }
    return (
        <Button
            className="w-full flex items-center justify-center"
            onClick={() => enrollCourse(Number(data?.courseId))}
            {...rest}
        >
            <div className="font-medium text-[20px] pr-2">Enroll</div>
            {isLoading && <Loading className="!text-white" />}
        </Button>
    )
}

export default EnrollBtn
