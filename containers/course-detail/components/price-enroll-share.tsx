import Button from '@/components/core/button'
// import { useEffect, useState } from 'react'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { goerli } from 'wagmi/chains'
// import { useAccount, useSigner } from 'wagmi'
// import { enroll } from '@/hooks/coursedex'
// import { approve, getBalance } from '@/hooks/usdt'
import Loading from '@/components/core/animate/loading'
// import { apiCourse } from '@/api/functions/api-course'
import { useSelector } from 'react-redux'
// import { getAssetState, getLoginState } from '@/store/user/selectors'
// import { ethers } from 'ethers'
import { getEnrollStatusState } from '@/store/course/selectors'
import EnrollBtn from './enroll-btn'
export interface IPriceEnrollShareProps {
    price: number
    className?: string
    courseId?: number,
    _id: string
}

export default function PriceEnrollShare(props: IPriceEnrollShareProps) {
    // const [isLoading, setIsLoading] = useState(false)
    // const [ballance, setBallance] = useState<number>(0)
    // const loginState = useSelector(getLoginState)
    const isEnrolled = useSelector(getEnrollStatusState)
    // const asset = useSelector(getAssetState)
    // const { data: signer } = useSigner({
    //     chainId: goerli.id,
    // })


    // const { address } = useAccount()
    // const enrollCourse = async (courseId: number) => {
    //     if (asset.balance >= props.price) {
    //         setIsLoading(true);
    //         if (asset.approve / (10 ** 18) <= Number(props.price)) {
    //             await approve(signer as ethers.Signer, props.price.toString())
    //         }

    //         await enroll(signer!, props.price.toString(), courseId);
    //         setIsLoading(false);
    //     } else {
    //         alert("You are not balance")
    //     }
    // }
    // useEffect(() => {
    //     ; (async () => {
    //         if (signer) {
    //             const currentballane: string = await getBalance(
    //                 address!,
    //                 signer!,
    //             )
    //             if (ballance !== Number(currentballane)) {
    //                 console.log(currentballane)
    //                 setBallance(Number(currentballane))
    //             }
    //         }
    //     })()
    // }, [ballance, address, signer])



    return (
        <div className="flex justify-center mt-6">
            {false ? (
                <div className="flex justify-center items-center h-20">
                    <Loading />
                </div>
            ) : (
                <div className={`${props.className}`}>
                    <div className="font-semibold text-[36px]">
                        {props.price + ' USDT'}
                    </div>
                    <div className="flex items-center justify-center space-x-4 mt-3 mb-5">

                        {
                            isEnrolled === true ? (
                                <Button
                                    className="btn-primary w-full"
                                    onClick={() => alert('Coming soon')}
                                >
                                    <div className="font-medium text-[20px]">
                                        Learn
                                    </div>
                                </Button>
                            ) : (
                                // <Button
                                //     className="btn-primary w-full"
                                //     onClick={() => enrollCourse(Number(props.courseId))}
                                // >
                                //     <div className="font-medium text-[20px]">
                                //         Enroll
                                //     </div>
                                // </Button>
                                <EnrollBtn />
                            )
                        }
                        <FontAwesomeIcon
                            icon={faShareNodes}
                            className="text-[20px] text-black rounded-full bg-white py-[14px] px-[16px] border border-black"
                        />
                    </div>
                </div>
            )
            }
        </div >
    )
}
