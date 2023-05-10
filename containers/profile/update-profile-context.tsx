import { UserAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateCertifications } from '@/store/certification'
import { getCertifications } from '@/store/certification/selectors'
import { Certificate } from '@/store/certification/types'
import { updateGlobalLoadingState, updateUserInfo } from '@/store/user'
import { getInstructorInfo } from '@/store/user/selectors'
import { User } from '@/store/user/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { noop } from 'lodash'
import { useRouter } from 'next/router'
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
interface IUpdateProfileContext {
    getUserInfo: UseMutateFunction<unknown, any, object, unknown>
    getCertificationList: UseMutateFunction<unknown, any, object, unknown>
    updateProfile: UseMutateFunction<unknown, any, object, unknown>
    userInfo: User
    certificationsList: Certificate[]
    setSearch: Dispatch<SetStateAction<string>>
    sortBy: string
    setSortBy: Dispatch<SetStateAction<string>>
    totalPage: number
    setPageNumber: Dispatch<SetStateAction<number>>
}

export const UpdateProfileContext = createContext<IUpdateProfileContext>(
    {} as IUpdateProfileContext,
)

export const SortCertificate = {
    CREATED_AT_ASC: 'createdAt:1',
    CREATED_AT_DESC: 'createdAt:-1',
    GRADUATION_ASC: 'graduation:1',
    GRADUATION_DESC: 'graduation:-1',
}
export const SortLabelCertificate = {
    CREATED_AT_ASC: 'Oldest',
    CREATED_AT_DESC: 'Newest',
    GRADUATION_ASC: 'Lowest Level',
    GRADUATION_DESC: 'Highest Level',
}

export const UpdateProfileProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const dispatch = useAppDispatch()
    const [userId, setUserId] = useState('')
    const certificationsList = useAppSelector(getCertifications)
    const userInfo = useAppSelector(getInstructorInfo)
    const [sortBy, setSortBy] = useState<string>('')
    const [pageNumber, setPageNumber] = useState(1)
    const limit = 10
    const [totalPage, setTotalPage] = useState(1)
    const [search, setSearch] = useState('')
    const router = useRouter()

    const getSortParams = () => {
        switch (sortBy) {
            case SortLabelCertificate.CREATED_AT_ASC:
                return SortCertificate.CREATED_AT_ASC
            case SortLabelCertificate.CREATED_AT_DESC:
                return SortCertificate.CREATED_AT_DESC
            case SortLabelCertificate.GRADUATION_ASC:
                return SortCertificate.GRADUATION_ASC
            case SortLabelCertificate.GRADUATION_DESC:
                return SortCertificate.GRADUATION_DESC
        }
    }
    const { mutate: getUserInfo, isLoading: isLoadingGetUserInfo } =
        useAPI.getMutation(UserAPI.GET_USER_INFO, {
            onError: noop,
            onSuccess(response) {
                setUserId(response._id)
                dispatch(updateUserInfo(response))
            },
        })
    const {
        mutate: getCertificationList,
        isLoading: isLoadingCertificationList,
    } = useAPI.getMutation(
        `${UserAPI.GET_LIST_CERTIFICATION}?userId=${userId}&page=${
            pageNumber - 1
        }&limit=${limit}${search !== '' ? '&query=' + search : ''}${
            sortBy !== '' ? '&sort=' + getSortParams() : ''
        }`,
        {
            onError: noop,
            onSuccess(response) {
                dispatch(updateCertifications(response?.data))
                setTotalPage(Math.ceil(response.total / limit))
            },
        },
    )
    const { mutate: updateProfile, isLoading: isLoadingUpdateProfile } =
        useAPI.put(UserAPI.GET_USER_INFO, {
            onError: noop,
            onSuccess() {
                getUserInfo({})
            },
        })
    useEffect(() => {
        if (userId !== '') {
            getCertificationList({})
        }
    }, [userId])

    useEffect(() => {
        getUserInfo({})
    }, [])

    const changeURL = () => {
        const newQuery: any = {}
        newQuery.page = pageNumber
        newQuery.limit = limit
        if (search !== '') {
            newQuery.query = search
        }
        if (sortBy !== '') {
            newQuery.sort = getSortParams()
        }
        router.push(
            {
                pathname: router.pathname,
                query: newQuery,
            },
            undefined,
            { shallow: true },
        )
    }

    useEffect(() => {
        getCertificationList({})
        if (router.pathname.includes('certificates')) {
            changeURL()
        }
    }, [search, sortBy, pageNumber])

    useEffect(() => {
        dispatch(
            updateGlobalLoadingState(
                isLoadingGetUserInfo ||
                    isLoadingCertificationList ||
                    isLoadingUpdateProfile,
            ),
        )
    }, [
        isLoadingGetUserInfo,
        isLoadingCertificationList,
        isLoadingUpdateProfile,
    ])

    return (
        <UpdateProfileContext.Provider
            value={{
                getUserInfo,
                getCertificationList,
                updateProfile,
                userInfo,
                certificationsList,
                setSearch,
                sortBy,
                setSortBy,
                totalPage,
                setPageNumber,
            }}
        >
            {children}
        </UpdateProfileContext.Provider>
    )
}

export const useUpdateProfileContext = () => {
    return useContext(UpdateProfileContext) as IUpdateProfileContext
}
