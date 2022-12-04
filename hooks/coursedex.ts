import { ethers } from 'ethers'
import { coursedexabi } from '@/abi/courseDex'
import { GetMintSignatureResponse } from '@/api/dto/course.dto'
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
    // Collect token contract
    const coursedex: ethers.Contract = getContract(signer)
    // Return claimed status
    const tx = await coursedex.createCourse(
        object.price,
        object.nonce,
        object.v,
        object.r,
        object.s,
    )
    tx.wait();
}
export const enroll = async (
    signer: ethers.Signer | null,
    amount: string,
    courseId: string,
): Promise<void> => {
    await approve(signer, amount);
    const coursedex: ethers.Contract = getContract(signer);
    const tx = coursedex.enroll(courseId);
    tx.wait();
}
