import LoadingScreen from '@/components/core/animate/loading-screen'
import { useAppSelector } from '@/hooks'
import { getGlobalLoadingState } from '@/store/user/selectors'

export interface IGlobalLoadingProps {
    isLoading: boolean
}

export default function GlobalLoading({ isLoading }: IGlobalLoadingProps) {
    const globalLoading = useAppSelector(getGlobalLoadingState)
    return <LoadingScreen isLoading={isLoading || globalLoading} />
}
