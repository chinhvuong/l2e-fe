import { idModalTransactionPending } from '@/components/common/modals/modal-transaction-pending'
import { initiateSocket, socket } from '@/services/socket'
import { useAppDispatch } from '@/store/hooks'
import { selectCurrentNetwork } from '@/store/network/selectors'
import { getNFTDetails } from '@/store/nft/detailSlice'
import { selectWallet } from '@/store/wallet/selectors'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const useSocketGlobal = (
    event: string,
    callback: any,
    isPendingTransaction = true,
) => {
    const currentNetwork = useSelector(selectCurrentNetwork)
    const { address: userAddress } = useSelector(selectWallet)
    useEffect(() => {
        const customCallback = isPendingTransaction
            ? (data: any) => {
                  const modalTransactionPending = document.getElementById(
                      idModalTransactionPending,
                  )
                  if (modalTransactionPending) {
                      callback(data)
                  }
              }
            : callback

        const connectSocket = async () => {
            if (socket?.connected === undefined) {
                if (userAddress) {
                    initiateSocket(userAddress)
                }
            }

            if (socket) {
                socket.off(event).on(event, customCallback)
            }
        }
        connectSocket()
    }, [userAddress, currentNetwork])
}

export const useSocketDetailPage = (
    event: string,
    setIsLoading: any,
    message: string,
) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const handleSocketResult = (data: any) => {
        console.log(data)
        setIsLoading(false)
        toast.success(message)
        dispatch(getNFTDetails(router.query))
    }
    const { address: userAddress } = useSelector(selectWallet)
    useEffect(() => {
        const connectSocket = async () => {
            if (socket?.connected === undefined) {
                if (userAddress) {
                    initiateSocket(userAddress)
                }
            }
            if (socket) {
                // console.log(
                //     '🚀 ~ file: useSocketGlobal.ts ~ line 50 ~ connectSocket ~ socket',
                //     socket,
                // )
                // console.log(socket)
                socket.off(event).on(event, handleSocketResult)
            }
        }
        connectSocket()
    }, [userAddress])
}
