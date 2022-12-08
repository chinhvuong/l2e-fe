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
    try {
        const coursedex: ethers.Contract = getContract(signer)
        // Return claimed status
        const tx = await coursedex.createCourse(
            object.price,
            object.nonce,
            object.v,
            object.r,
            object.s,
        )
        await tx.wait();
    } catch (err) {
        console.log(err)
    }
    // Collect token contract
}
export const enroll = async (
    signer: ethers.Signer | null,
    amount: string,
    courseId: number,
): Promise<void> => {
    await approve(signer, amount)
    try {
        const coursedex: ethers.Contract = getContract(signer);
        const tx = await coursedex.enrollCourse(courseId);
        await tx.wait();
    } catch (err) {
        console.log(err, 'Error enrolling')
    }
}
