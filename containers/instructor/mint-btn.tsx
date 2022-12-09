import React, { useState } from 'react'
import { useContractWrite, useNetwork, usePrepareContractWrite, useSigner } from 'wagmi'
import { coursedexabi } from '@/abi/courseDex'
import Button from '@/components/core/button'
import Loading from '@/components/core/animate/loading'
import { apiCourse } from '@/api/functions/api-course'
import { createCourse } from '@/hooks/coursedex'
import { goerli } from 'wagmi/chains'
import { ethers } from 'ethers'

const MintBtn = ({ id }: { id: string }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { data: signer } = useSigner({
        chainId: goerli.id,
    })

    const mintCourse = async (id: string) => {
        // alert('alo')
        try {
            setIsLoading(true)
            const payload = await apiCourse.getMintSignature(id)
            await createCourse(signer as ethers.Signer, payload)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
        }

    }

    return (
        <Button
            className='flex items-center gap-4 p-1 text-sm'
            onClick={() =>
                mintCourse(id)
            }
        >
            <span>Mint Course</span>
            {isLoading && <Loading className='!text-white' />}
        </Button>
    )
}

export default MintBtn