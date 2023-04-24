import { ethers } from 'ethers'
import { coursedexabi } from '@/abi/courseDex'
import {
    GetMintCertificateSignatureResponse,
    GetMintSignatureResponse,
} from '@/api/dto/course.dto'
import { approve } from '@/hooks/usdt'
const getContract = (signer: ethers.Signer | null): ethers.Contract => {
    return new ethers.Contract(
        process.env.NEXT_PUBLIC_COURSEDEX_CONTRACT ?? '',
        coursedexabi,
        // Get signer from authed provider
        signer!,
    )
}
export const createCourse = async (
    signer: ethers.Signer | null,
    object: GetMintSignatureResponse,
): Promise<void> => {
    console.log(process.env.NEXT_PUBLIC_COURSEDEX_CONTRACT)
    const coursedex: ethers.Contract = getContract(signer)
    // Return claimed status
    const tx = await coursedex.createCourse(
        object.price,
        object.nonce,
        object.v,
        object.r,
        object.s,
    )
    await tx.wait()
    await tx.wait()

    // Collect token contract
}

export const enroll = async (
    signer: ethers.Signer | null,
    amount: string,
    courseId: number,
): Promise<void> => {
    // await approve(signer, amount)
    const courseDex: ethers.Contract = getContract(signer)
    console.log(courseId)
    const tx = await courseDex.enrollCourse(courseId)
    await tx.wait()
}

export const claimReward = async (
    signer: ethers.Signer | null,
    object: GetMintSignatureResponse,
): Promise<void> => {
    const coursedex: ethers.Contract = getContract(signer)
    // Return claimed status
    const tx = await coursedex.claimReward(
        object.price,
        object.nonce,
        object.v,
        object.r,
        object.s,
    )
    await tx.wait()
    await tx.wait()
    // Collect token contract
}

export const claimCertificate = async (
    signer: ethers.Signer | null,
    object: GetMintCertificateSignatureResponse,
): Promise<void> => {
    const coursedex: ethers.Contract = getContract(signer)
    // Return claimed status
    const tx = await coursedex.claimCertificate(
        object.courseId,
        object.nonce,
        object.v,
        object.r,
        object.s,
    )
    await tx.wait()
    await tx.wait()
    // Collect token contract
}
