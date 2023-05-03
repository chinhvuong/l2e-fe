import { updateLoadingState } from '@/store/course'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './index'
import { getLoadingState } from '@/store/course/selectors'

const useHideFirstEnterLoadingScreen = () => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(getLoadingState)

    useEffect(() => {
        if (isLoading) {
            dispatch(updateLoadingState(false))
        }
    }, [isLoading])
}

export default useHideFirstEnterLoadingScreen
