import { languageList } from '@/constants'
import { Category } from '@/constants/interfaces'
import queryString from 'query-string'

export const convertToCategoryID = (
    categoryList: Category[] | undefined,
    categoryName: string,
) => {
    if (categoryList) {
        return (
            categoryList.find((item: Category) => item.name === categoryName)
                ?._id ?? ''
        )
    }
    return ''
}

export const convertToCategoryName = (
    categoryList: Category[] | undefined,
    categoryId: string,
) => {
    if (categoryList) {
        return (
            categoryList.find((item: Category) => item._id === categoryId)
                ?.name ?? ''
        )
    }
    return ''
}

export const getLanguageName = (languageId: string) => {
    return languageList[languageId as keyof typeof languageList]
}

export const queryStringToObject = (str: string, options = {}) =>
    queryString.parse(str, {
        arrayFormat: 'bracket',
        ...options,
    })

export const objectToQueryString = (obj: object, options = {}) =>
    queryString.stringify(obj, {
        arrayFormat: 'bracket',
        ...options,
    })
