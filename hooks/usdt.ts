import { ethers } from 'ethers'
import { usdtAbi } from '@/abi/usdt'
import { BigNumber } from 'ethers'
const getusdtContract = (
   signer: ethers.Signer | null,
): ethers.Contract => {
    return new ethers.Contract(
        process.env.NEXT_PUBLIC_USDT_CONTRACT ?? '',
        usdtAbi,
        // Get signer from authed provider
        signer!,
    )
}
export const getBalance = async (address: string,signer: ethers.Signer | null): Promise<string> => {
  console.log(signer);
  // Collect token contract
  const usdt: ethers.Contract = getusdtContract(signer);
  const ballance : BigNumber = await usdt.balanceOf(address);
  // Return claimed status
  return ethers.utils.formatUnits( ballance.toString(), parseInt(process.env.NEXT_PUBLIC_DECIMAL as string));
};
export const approve = async (signer: ethers.Signer | null,amount : string): Promise<void> => {
  // Collect token contract
  const usdt: ethers.Contract = getusdtContract(signer);
  // Return claimed status
  await usdt.approve(process.env.NEXT_PUBLIC_COURSEDEX_CONTRACT,ethers.utils.parseUnits(amount,parseInt(process.env.NEXT_PUBLIC_DECIMAL as string)));
};