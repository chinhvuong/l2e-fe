import Button from '@/components/core/button'
import { useEffect, useState } from 'react'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { goerli } from 'wagmi/chains'
import { useAccount, useSigner } from 'wagmi'
import { enroll } from '@/hooks/coursedex'
import { getBalance } from '@/hooks/usdt'
import Loading from '@/components/core/animate/loading'
export interface IPriceEnrollShareProps {
    price: number
    className?: string
    courseId: number
}

export default function PriceEnrollShare(props: IPriceEnrollShareProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [ballance, setBallance] = useState<number>(0)
    const { data: signer } = useSigner({
        chainId: goerli.id,
    })
    const { address, isConnected } = useAccount()
    const enrollCourse = async (courseId: number) => {
        if (ballance >= props.price) {
            setIsLoading(true);
            await enroll(signer!, props.price.toString(), courseId);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        ;(async () => {
            if (signer) {
                const currentballane: string = await getBalance(
                    address!,
                    signer!,
                )
                console.log(currentballane);
                if (ballance !== Number(currentballane)) {
                    console.log(currentballane)
                    setBallance(Number(currentballane))
                }
            }
        })()
    }, [ballance, address, signer])
    return (
        <div className="flex justify-center mt-6">
            {isLoading ? (
                <div className="flex justify-center items-center h-20">
                    <Loading />
                </div>
            ) : (
                <div className={`${props.className}`}>
                    <div className="font-semibold text-[36px]">
                        {props.price + ' USDT'}
                    </div>
                    <div className="flex items-center justify-center space-x-4 mt-3 mb-5">
                        <Button
                            className="btn-primary w-full"
                            onClick={() => enrollCourse(props.courseId)}
                        >
                            <div className="font-medium text-[20px]">
                                Enroll
                            </div>
                        </Button>
                        <FontAwesomeIcon
                            icon={faShareNodes}
                            className="text-[20px] text-black rounded-full bg-white py-[14px] px-[16px] border border-black"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
