import React, { useState } from 'react'
import { useSigner } from 'wagmi'
import Button from '@/components/core/button'
import Loading from '@/components/core/animate/loading'
import { createCourse } from '@/hooks/coursedex'
import { goerli } from 'wagmi/chains'
import { ethers } from 'ethers'
import { callAPI } from '@/api/axios-client'
import { InstructorAPI } from '@/api/api-path'

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
        <Button
            className="flex items-center gap-4 p-1 text-sm"
            onClick={() => mintCourse(id)}
        >
            <span>Mint Course</span>
            {isLoading && <Loading className="!text-white" />}
        </Button>
    )
}

export default MintBtn
