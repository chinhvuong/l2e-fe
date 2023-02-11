import { updateLoadingState } from '@/store/course'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useLoadingScreen(isLoading: boolean): void {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateLoadingState(isLoading))
    }, [isLoading])
}

export default useLoadingScreen
