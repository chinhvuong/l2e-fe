import { InstructorAPI } from '@/api/api-path'
import { callAPI } from '@/api/axios-client'
import Button from '@/components/core/button'
import { createCourse } from '@/hooks/coursedex'
import { ethers } from 'ethers'
import { useState } from 'react'
import { useSigner } from 'wagmi'
import { goerli } from 'wagmi/chains'

const MintBtn = ({ id }: { id: string }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { data: signer } = useSigner({
        chainId: goerli.id,
    })

    const mintCourse = async (id: string) => {
        try {
            setIsLoading(true)
            const payload = await callAPI(
                'get',
                InstructorAPI.GET_MINT_SIGNATURE + '?id=' + id,
                {},
            )
            await createCourse(signer as ethers.Signer, payload)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <Button onClick={() => mintCourse(id)} isLoading={isLoading}>
            <div className="font-semibold w-full flex justify-center">
                Mint Course
            </div>
        </Button>
    )
}

export default MintBtn
