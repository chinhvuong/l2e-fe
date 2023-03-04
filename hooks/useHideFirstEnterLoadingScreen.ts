import { updateLoadingState } from '@/store/course'
import { useEffect } from 'react'
import { useAppDispatch } from './index'

const useHideFirstEnterLoadingScreen = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(updateLoadingState(false))
    }, [])
}

export default useHideFirstEnterLoadingScreen
