import { coursedexabi } from '@/abi/courseDex'
import {
    GetMintCertificateSignatureResponse,
    GetMintSignatureResponse,
} from '@/api/dto/course.dto'
import { ethers } from 'ethers'
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
    const courseDex: ethers.Contract = getContract(signer)
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
