import { updateLoginState } from '@/store/user'
import useWeb3 from '@/wallet/hooks/useWeb3'
import Router from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch } from './index'

const useLogOut = () => {
    const { disconnect } = useWeb3()
    const dispatch = useAppDispatch()
    const logOut = async () => {
        await disconnect()
        localStorage.clear()
        dispatch(updateLoginState(false))
        Router.push(`/`)
    }

    useEffect(() => {
        logOut()
    }, [])
}

export default useLogOut
